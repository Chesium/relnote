import { relation } from "./relation";
import { character } from "./relnote";

export default abstract class frontendEvent {
  time: Date;
  constructor() {
    this.time = new Date();
  }
}

export class addCh extends frontendEvent {
  ch:character;
  constructor(Character:character){
    super();
    this.ch=Character;
  }
}

export class addR extends frontendEvent {
  rel:relation;
  constructor(rel:relation){
    super();
    this.rel=rel;
  }
}

export class checkR extends frontendEvent {
  rel:relation;
  constructor(rel:relation){
    super();
    this.rel=rel;
  }
}

export class plQ extends frontendEvent {
  q:string;
  constructor(query:string){
    super();
    this.q=query;
  }
}