import { query, insert, check } from "./swiplPort.js";
import log from "./log.js";

window.chL = [];

export async function addCharacter(name) {
  let ID = window.chL.length;
  window.chL.push({ name: name, id: ID });
  log(`Add Character: [c${ID}] "${name}"`, "rn");
  await insert(`character("${name}",c${ID})`);

  let chlT = document.getElementById("chlTable");
  chlT.innerHTML += `<tr><td><center>c${ID}</center></td><td>${name}</td></tr>`;
}

function getChIdByName(name) {
  for (let i in window.chL) {
    if (window.chL[i].name == name) return i;
  }
  alert("getChIdByName: Not Found");
  return -1;
}

export async function addR(Na, Nb, Rel) {
  let A = getChIdByName(Na),
    B = getChIdByName(Nb);
  await addRelById(A, B, Rel);
  log(`Add Relation: [c${Na}]——[c${Nb}]:${Rel}`, "rn");
}

export async function addRelById(A, B, Rel) {
  let krlT = document.getElementById("krlTable");
  krlT.innerHTML += `<tr><td>[c${A}]${window.chL[A].name}</td><td>[c${B}]${window.chL[B].name}</td><td><center>${Rel}</center></td></tr>`;
  await insert(`rel(c${A},c${B},${Rel})`);
}

export async function checkR(Na, Nb, Rel) {
  let A = getChIdByName(Na),
    B = getChIdByName(Nb);
  log(`CheckIf :[c${Na}]——[c${Nb}]:${Rel}"`, "rn");
  return await check(`rel(c${A},c${B},${Rel})`);
}

export async function findR(LR, Nx, Rel) {
  let X = getChIdByName(Nx);
  let qstr = LR == "l" ? `setof(I,rel(I,c${X},${Rel}),L)` : `setof(I,rel(c${X},I,${Rel}),L)`;
  if (LR == "l") log(`Search : Who——[c${Nx}]:${Rel}"`, "rn");
  else log(`Search : [c${Nx}]——Who:${Rel}"`, "rn");
  let res = await query(qstr);
  if (res.success) console.log(res.vars[1].value);
  else console.log([]);
}

export async function getallR(Rel) {
  log(`Search : Who——Who:${Rel}"`, "rn");
  let res = await query(`setof(Ai:Bi,rel(Ai,Bi,${Rel}),L)`);
  if (res.success) console.log(res.vars[2].value);
  else console.log([]);
}

export async function allRel() {
  log(`Search : All Relationships"`, "rn");
  let res = await query(`setof(A:B:R,rel(A,B,R),L)`);
  console.log(res.vars[3].value);
}

export async function getCharacterList() {
  log(`Get : All characters"`, "rn");
  let res = await query(`setof(N:I,character(N,I),L)`);
  console.log(res.vars[2].value);
}
