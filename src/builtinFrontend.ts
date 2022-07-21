import { frontend } from "./relnote";
import frontendEvent from "./frontendEvents";
import * as FEv from "./frontendEvents";

export default class builtinFrontend extends frontend {
  log(str: string, type: string) {
    let logDiv = document.getElementById("log") as HTMLElement;
    logDiv.innerHTML += `<p class=log_${type}>${str}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  }
  err(str: string) {
    alert(str);
  }
  handleEvent(ev: frontendEvent) {
    if (ev instanceof FEv.addCh) {
      this.log(`Add Character: [c${ev.ch.id}] "${ev.ch.name}"`, "rn");
      let chlT = document.getElementById("chlTable") as HTMLElement;
      chlT.innerHTML += `<tr><td><center>c${ev.ch.id}</center></td><td>${ev.ch.name}</td></tr>`;
    } else if (ev instanceof FEv.addR) {
      this.log(`Add Relation: ${ev.rel.description()}`, "rn");
      let krlT = document.getElementById("krlTable") as HTMLElement;
      krlT.innerHTML += `<tr>${ev.rel.description()}</tr>`;
    } else if (ev instanceof FEv.checkR) {
      this.log(`Check Relation: ${ev.rel.description()}`, "rn");
    } else if (ev instanceof FEv.plQ) {
      this.log(`Query "${ev.q}"`, "swipl");
    } else {
      this.err("unknown frontend event type");
    }
  }
}
