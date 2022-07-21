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

  async getall(term: string): Promise<string[][]> {
    const tmp_ident = "Un",
      sub_ident = /#\d+/g,
      list_ident = "UnL";
    // "Un1:Un2:Un3: ... :Un<unknownN>" 其中 Un 为 tmp_ident
    let N = 1;
    let qtmp = term.replace(sub_ident, (w) => {
      if (Number(w.slice(1)) > N) N = Number(w.slice(1));
      return tmp_ident + w.slice(1);
    });
    let tmp_list = [...Array(N).keys()].map((v) => tmp_ident + (v + 1)).join(":");
    let qstr = `setof(${tmp_list},${qtmp},${list_ident})`;
    let res = await this.query(qstr);
    if (!res.success) return [];
    let final = res.vars
      .slice(-1)[0]
      .value.slice(1, -1)
      .split(",")
      .map((l) => l.split(":"));
    return final;
  }
}
