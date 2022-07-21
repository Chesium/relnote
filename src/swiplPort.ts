import { frontend } from "./relnote";
import * as FEv from "./frontendEvents";

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
  f: frontend;
  path: string;

  constructor(path: string, frontend: frontend) {
    this.path = path;
    this.f = frontend;
  }

  async query(str: string): Promise<swiplResponse> {
    this.f.handleEvent(new FEv.plQ(str));
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

  async insert(term: string, order: "a" | "z" = "z") {
    await this.query(`assert${order}(${term})`);
  }

  async getall(term: string) {
    const tmp_ident = "Un",
      sub_ident = /#/g,
      list_ident = "UnL";
    let qstr = `setof(${tmp_ident},${term.replace(sub_ident, tmp_ident)},${list_ident})`;
    let res = await this.query(qstr);
    if (res.success) return res.vars.slice(-1)[0].value;
    else return "[]";
  }
}
