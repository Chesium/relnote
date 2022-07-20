// import { query, sanitizeText } from "./swiplPort.js";
import relnote from "./relnote.js";
import log from "./log.js";
// Simple client for running a query on the server and displaying the result

// Called by <body onload="renderPage();">
// async function renderPage() {
  // document.getElementById("addChButton").addEventListener("submit", handleAddCh);
// }

// async function handleAddCh(event) {
//   event.preventDefault();
//   let name = document.getElementById("q_name").value;
//   // let id = document.getElementById("q_id").id;
//   // displayQueryResult(res);
// }

// window.renderPage = renderPage;
// window.addCharacter = app.addCharacter;
// window.getCharacterList = app.getCharacterList;

const app=new relnote("/json");
window.app=app; //调试

async function test() {
  for (let i = 1; i <= 40; i++) {
    await app.addCharacter(`T${i}`);
  }
  // await addCharacter("23_HAHAH");
  // await addCharacter("-——_简介");
  await app.getCharacterList();
  // await app.addRelById(1,0,"father");
  // await app.addRelById(2,0,"mother");
  // await app.addRelById(0,1,"son");
  // await app.addRelById(0,2,"son");
  await app.addR("T2", "T1", "father");
  await app.addR("T3", "T1", "mother");
  await app.addR("T1", "T2", "son");
  await app.addR("T1", "T3", "son");
  await app.allRel();
  await app.getallR("son");
  await app.findR("l", "T1", "father");
  await app.findR("r", "T1", "son");
  await app.findR("l", "T2", "son");
  await app.findR("r", "T3", "mother");
  await app.findR("l", "T3", "mother");
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
