import { character } from "./relnote";

export class relationType {
  pid: string = "";
  arity: number = 2;
  tags: string[] = [];
  fmt: string = "#1 and #2 : #i";
  constructor() {}
}

export class relation {
  type: relationType;
  ch: character[];
  static prologFact(type: relationType, ch: character[]): string {
    var str = `rel([`;
    ch.map((ch, _) => {
      str += ch.pid() + ",";
    });
    return str.slice(0, -1) + `],${type.pid})`;
  }
  constructor(type: relationType, ch: character[]) {
    this.type = type;
    if (ch.length != this.type.arity)
      throw new Error("[New relation]The number of characters is unequal to the relT's arity");
    this.ch = ch;
  }
  description(): string {
    return this.type.fmt.replace(/#\d/g, (w) => this.ch[Number(w[1])-1].name).replace(/#i/g, this.type.pid);
  }
  prologFact(): string {
    return relation.prologFact(this.type, this.ch);
  }
}
