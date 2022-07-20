import log from "./log.js";

export default class database {
  constructor(path) {
    this.path = path;
  }

  async query(string) {
    // callback should take a single arg, the response from the server.
    log(`Query "${string}"`, "swipl");
    try {
      const response = await fetch(this.path, {
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

  async check(term) {
    let res = await this.query(term);
    return res.success; // Boolean
  }

  async insert(term) {
    await this.query(`assertz(${term})`);
  }

  static sanitizeText(str) {
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
}
