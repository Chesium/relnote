import log from './log.js'
// Send a request to the server and schedule a callback.
export async function query(string) {
  // callback should take a single arg, the response from the server.
  log(`Query "${string}"`,"swipl");
  try {
    const response = await fetch("/json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: string }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  } catch (err) {
    alert("***fetch " + JSON.stringify(request) + ": " + err);
  }
}

export async function check(term) {
  let res = await query(term);
  return res.success; // Boolean
}

export async function insert(term) {
  await query(`assertz(${term})`);
}

export function sanitizeText(str) {
  return str
    ? str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
        .replace(/\n/g, "<br/>") // TODO: remove - not needed?
        .replace(/\s/g, "&nbsp;") // TODO: add test for tabs in source
    : str;
}
