import frontendEvent from "./frontendEvents";
import database from "./swiplPort";
import { relation, relationType } from "./relation";
import builtinRelT from "./builtinRelT";
import * as FEv from "./frontendEvents";

export abstract class frontend {
  abstract log(str: string, type: string): void;
  abstract err(str: string): void;
  abstract handleEvent(ev: frontendEvent): void;
}

export class character {
  name: string = "";
  id: number = NaN;
  constructor(Name: string, ID: number) {
    this.name = Name;
    this.id = ID;
  }
  prologFact(): string {
    return `character("${this.name}",c${this.id})`;
  }
  pid(): string {
    return `c${this.id}`;
  }
}

export default class relnote {
  db: database;
  chs: character[] = [];
  rels: relation[] = [];
  loadedRelTs: { [index: string]: relationType } = {};
  f: frontend;
  constructor(database_path: string, ftd: frontend) {
    this.db = new database(database_path, ftd);
    this.f = ftd;
    this.loadRelationTypes(builtinRelT);
  }

  async addCharacter(name: string) {
    let ID = this.chs.length;
    const ch = new character(name, ID);
    this.chs.push(ch);
    this.f.handleEvent(new FEv.addCh(ch));
    await this.db.insert(ch.prologFact());
  }

  getChIdByName(name: string) {
    for (let i in this.chs) if (this.chs[i].name == name) return Number(i);
    alert("getChIdByName: Not Found");
    return -1;
  }

  async addR(Ns: string[], Rel: string) {
    await this.addRel(
      Ns.map((n, _) => this.getChIdByName(n)),
      this.loadedRelTs[Rel]
    );
  }

  async addRel(IDS: number[], type: relationType) {
    const rel = new relation(
      type,
      IDS.map((i, _) => this.chs[i])
    );
    this.rels.push(rel);
    this.f.handleEvent(new FEv.addR(rel));
    await this.db.insert(rel.prologFact());
  }

  async checkR(Ns: string[], Rel: string) {
    const qrel = new relation(
      this.loadedRelTs[Rel],
      Ns.map((n, _) => this.chs[this.getChIdByName(n)])
    );
    return await this.db.check(qrel.prologFact());
  }

  async findR_lr(LR: "l" | "r", Nx: string, Rel: string) {
    let ch = this.chs[this.getChIdByName(Nx)];
    if (this.loadedRelTs[Rel].arity != 2) throw new Error("RelationType's arity isn't 2.");

    let qtmp =
      LR == "l" ? `rel([#,${ch.pid()}],${Rel})` : `rel([${ch.pid()},#],${Rel})`;
    // if (LR == "l") log(`Search : Who——[c${Nx}]:${Rel}"`, "rn");
    // else log(`Search : [c${Nx}]——Who:${Rel}"`, "rn");
    let res = await this.db.getall(qtmp);
    console.log(res);
  }

  // async getallR(Rel: string) {
  //   log(`Search : Who——Who:${Rel}"`, "rn");
  //   let res = await this.db.query(`setof(Ai:Bi,rel(Ai,Bi,${Rel}),L)`);
  //   if (res.success) console.log(res.vars[2].value);
  //   else console.log([]);
  // }

  // async allRel() {
  //   log(`Search : All Relationships"`, "rn");
  //   let res = await this.db.query(`setof(A:B:R,rel(A,B,R),L)`);
  //   console.log(res.vars[3].value);
  // }

  // async getCharacterList() {
  //   log(`Get : All characters"`, "rn");
  //   let res = await this.db.query(`setof(N:I,character(N,I),L)`);
  //   console.log(res.vars[2].value);
  // }

  async loadRelationType(relT: relationType) {
    this.loadedRelTs[relT.pid] = relT;
    await this.db.insert(`:- dynamic ${relT.pid}/${relT.arity}`, "a");
  }

  async loadRelationTypes(relTs: relationType[]) {
    relTs.map(async (relT, _) => {
      await this.loadRelationType(relT);
    });
  }
}
