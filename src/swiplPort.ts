import log from "./log";

export interface swiplResp {
  query: string;
  success: boolean;
  query_after_call: string;
  error: string;
  printed_output: string;
  vars: { var: string; value: string }[];
}

export class swiplResponse implements swiplResp {
  query: string = "";
  success: boolean = false;
  query_after_call: string = "";
  error: string = "";
  printed_output: string = "";
  vars: { var: string; value: string }[] = [];
  constructor() {}
}

export default class database {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async query(str: string): Promise<swiplResponse> {
    log(`Query "${str}"`, "swipl");
    try {
      const response = await fetch(this.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: str }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      return response.json() as unknown as swiplResponse;
    } catch (err) {
      alert("***fetch : " + err);
      return new swiplResponse();
    }
  }

  async check(term: string) {
    let res = await this.query(term);
    return res.success; // Boolean
  }

  async insert(term: string) {
    await this.query(`assertz(${term})`);
  }
}
