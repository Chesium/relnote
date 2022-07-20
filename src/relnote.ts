import database from "./swiplPort";
import log from "./log";

export class character {
  name:string="";
  id:number=NaN;
  constructor(Name:string,ID:number){
    this.name=Name;
    this.id=ID;
  }
}

export default class relnote {
  db:database;
  chL:character[];
  constructor(database_path:string) {
    this.db = new database(database_path);
    this.chL = [];
    // this.f=frontend;
  }

  async addCharacter(name:string) {
    let ID = this.chL.length;
    this.chL.push({ name: name, id: ID });
    log(`Add Character: [c${ID}] "${name}"`, "rn");
    await this.db.insert(`character("${name}",c${ID})`);
    let chlT = document.getElementById("chlTable") as HTMLElement;
    chlT.innerHTML += `<tr><td><center>c${ID}</center></td><td>${name}</td></tr>`;
  }

  getChIdByName(name:string) {
    for (let i in this.chL) {
      if (this.chL[i].name == name) return Number(i);
    }
    alert("getChIdByName: Not Found");
    return -1;
  }

  async addR(Na:string, Nb:string, Rel:string) {
    let A = this.getChIdByName(Na),
      B = this.getChIdByName(Nb);
    await this.addRelById(A, B, Rel);
    log(`Add Relation: [c${Na}]——[c${Nb}]:${Rel}`, "rn");
  }

  async addRelById(A:number, B:number, Rel:string) {
    let krlT = document.getElementById("krlTable") as HTMLElement;
    krlT.innerHTML += `<tr><td>[c${A}]${this.chL[A].name}</td><td>[c${B}]${this.chL[B].name}</td><td><center>${Rel}</center></td></tr>`;
    await this.db.insert(`rel(c${A},c${B},${Rel})`);
  }

  async checkR(Na:string, Nb:string, Rel:string) {
    let A = this.getChIdByName(Na),
      B = this.getChIdByName(Nb);
    log(`CheckIf :[c${Na}]——[c${Nb}]:${Rel}"`, "rn");
    return await this.db.check(`rel(c${A},c${B},${Rel})`);
  }

  async findR(LR:"l"|"r", Nx:string, Rel:string) {
    let X = this.getChIdByName(Nx);
    let qstr = LR == "l" ? `setof(I,rel(I,c${X},${Rel}),L)` : `setof(I,rel(c${X},I,${Rel}),L)`;
    if (LR == "l") log(`Search : Who——[c${Nx}]:${Rel}"`, "rn");
    else log(`Search : [c${Nx}]——Who:${Rel}"`, "rn");
    let res = await this.db.query(qstr);
    if (res.success) console.log(res.vars[1].value);
    else console.log([]);
  }

  async getallR(Rel:string) {
    log(`Search : Who——Who:${Rel}"`, "rn");
    let res = await this.db.query(`setof(Ai:Bi,rel(Ai,Bi,${Rel}),L)`);
    if (res.success) console.log(res.vars[2].value);
    else console.log([]);
  }

  async allRel() {
    log(`Search : All Relationships"`, "rn");
    let res = await this.db.query(`setof(A:B:R,rel(A,B,R),L)`);
    console.log(res.vars[3].value);
  }

  async getCharacterList() {
    log(`Get : All characters"`, "rn");
    let res = await this.db.query(`setof(N:I,character(N,I),L)`);
    console.log(res.vars[2].value);
  }
}
