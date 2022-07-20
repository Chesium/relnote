import { query, sanitizeText } from "./swiplPort.js";
import * as RN from "./relnote.js";
import log from "./log.js";
// Simple client for running a query on the server and displaying the result

// Called by <body onload="renderPage();">
async function renderPage() {
  document.getElementById("addChButton").addEventListener("submit", handleAddCh);
}

async function handleAddCh(event) {
  event.preventDefault();
  let name = document.getElementById("q_name").value;
  // let id = document.getElementById("q_id").id;
  // displayQueryResult(res);
}

window.renderPage = renderPage;
// window.addCharacter = RN.addCharacter;
// window.getCharacterList = RN.getCharacterList;

async function test() {
  for (let i = 1; i <= 40; i++) {
    await RN.addCharacter(`T${i}`);
  }
  // await addCharacter("23_HAHAH");
  // await addCharacter("-——_简介");
  await RN.getCharacterList();
  // await RN.addRelById(1,0,"father");
  // await RN.addRelById(2,0,"mother");
  // await RN.addRelById(0,1,"son");
  // await RN.addRelById(0,2,"son");
  await RN.addR("T2", "T1", "father");
  await RN.addR("T3", "T1", "mother");
  await RN.addR("T1", "T2", "son");
  await RN.addR("T1", "T3", "son");
  await RN.allRel();
  await RN.getallR("son");
  await RN.findR("l", "T1", "father");
  await RN.findR("r", "T1", "son");
  await RN.findR("l", "T2", "son");
  await RN.findR("r", "T3", "mother");
  await RN.findR("l", "T3", "mother");
  // setof(A:B:R,rel(A,B,R),L)
}

window.log = log;

window.test = () => {
  let start = performance.now();
  let res = test();
  res.then(() => {
    let end = performance.now();
    console.log(`use ${end - start} ms`);
  });
};
