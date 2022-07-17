import { query, insert, check } from "./swiplPort.js";

window.chL = [];

export async function addCharacter(name) {
  let ID = window.chL.length;
  window.chL.push({ name: name, id: ID });
  await insert(`character("${name}",c${ID})`);
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
}

export async function addRelById(A, B, Rel) {
  await insert(`rel(c${A},c${B},${Rel})`);
}

export async function checkR(Na, Nb, Rel) {
  let A = getChIdByName(Na),
    B = getChIdByName(Nb);
  return await check(`rel(c${A},c${B},${Rel})`);
}

export async function findR(LR, Nx, Rel) {
  let X = getChIdByName(Nx);
  let qstr = LR == "l" ? `setof(I,rel(I,c${X},${Rel}),L)` : `setof(I,rel(c${X},I,${Rel}),L)`;
  let res = await query(qstr);
  if (res.success) console.log(res.vars[1].value);
  else console.log([]);
}

export async function getallR(Rel) {
  let res = await query(`setof(Ai:Bi,rel(Ai,Bi,${Rel}),L)`);
  if (res.success) console.log(res.vars[2].value);
  else console.log([]);
}

export async function allRel() {
  let res = await query(`setof(A:B:R,rel(A,B,R),L)`);
  console.log(res.vars[3].value);
}

export async function getCharacterList() {
  let res = await query(`setof(N:I,character(N,I),L)`);
  console.log(res.vars[2].value);
}
