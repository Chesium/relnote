import { query, sanitizeText } from "./swiplPort.js";
import * as RN from "./relnote.js";
// Simple client for running a query on the server and displaying the result

// Called by <body onload="renderPage();">
async function renderPage() {
  document.getElementById("query_form").addEventListener("submit", handleSubmit);
  document.getElementById("result").style.display = "none";
}

// Handler for form's "Send query" button
async function handleSubmit(event) {
  event.preventDefault();
  let text = document.getElementById("query");
  let res = await query(text.value);
  displayQueryResult(res);
}

// Callback from fetchFromServer for handleSubmit
function displayQueryResult(query_result) {
  document.getElementById("result").style.display = "block";
  document.getElementById("result:query").innerHTML = "<code>" + sanitizeText(query_result.query) + "</code>";
  document.getElementById("result:success").innerHTML = "<i>" + query_result.success.toString() + "</i>";
  document.getElementById("result:query_after_call").innerHTML =
    "<code>" + sanitizeText(query_result.query_after_call) + "</code>";
  document.getElementById("result:error").innerHTML =
    "<i><code>" + sanitizeText(query_result.error) + "</code></i>";
  document.getElementById("result:printed_output").innerHTML =
    '<div class="printed_output">' + sanitizeText(query_result.printed_output) + "</div>";
  document.getElementById("result:vars").innerHTML = "&nbsp";
  if (query_result.success === true) {
    let table = document.createElement("table");
    table.setAttribute("class", "vars_table");
    for (const one_var of query_result.vars) {
      var row = table.insertRow();
      row.vAlign = "top";
      var td1 = row.insertCell();
      td1.setAttribute("class", "vars_table");
      td1.innerHTML = "<b><code>" + sanitizeText(one_var.var) + "</code></b>";
      var td2 = row.insertCell();
      td2.setAttribute("class", "vars_table");
      td2.innerHTML = "<code>" + sanitizeText(one_var.value) + "</code>";
    }
    let result_vars_elem = document.getElementById("result:vars");
    while (result_vars_elem.firstChild) {
      result_vars_elem.firstChild.remove();
    }
    result_vars_elem.appendChild(table);
    document.getElementById("result:query_after_call").innertHTML =
      "<code>" + sanitizeText(query_result.query_after_call) + "</code>";
  } else if (query_result.success === false) {
    // do nothing
  } else if (query_result.success === "error") {
    // do nothing
  } else {
    alert("Impossible code from server: " + JSON.stringify(query_result));
  }
}

window.renderPage = renderPage;
// window.addCharacter = RN.addCharacter;
// window.getCharacterList = RN.getCharacterList;

async function test() {
  for (let i = 1; i <= 4; i++) {
    await RN.addCharacter(`T${i}`);
  }
  // await addCharacter("23_HAHAH");
  // await addCharacter("-——_简介");
  await RN.getCharacterList();
  // await RN.addRelById(1,0,"father");
  // await RN.addRelById(2,0,"mother");
  // await RN.addRelById(0,1,"son");
  // await RN.addRelById(0,2,"son");
  await RN.addR("T2","T1","father");
  await RN.addR("T3","T1","mother");
  await RN.addR("T1","T2","son");
  await RN.addR("T1","T3","son");
  await RN.allRel();
  await RN.getallR("son");
  await RN.findR("l","T1","father");
  await RN.findR("r","T1","son");
  await RN.findR("l","T2","son");
  await RN.findR("r","T3","mother");
  await RN.findR("l","T3","mother");
  // setof(A:B:R,rel(A,B,R),L)
}

window.test = () => {
  let start = performance.now();
  let res = test();
  res.then(() => {
    let end = performance.now();
    console.log(`use ${end - start} ms`);
  });
};
