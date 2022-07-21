import { relationType } from "./relation";

const builtinRelT: relationType[] = [
  {
    pid: "father_child",
    arity: 2,
    tags: [],
    fmt: "#1 是 #2 的父亲",
  },
  {
    pid: "mother_child",
    arity: 2,
    tags: [],
    fmt: "#1 是 #2 的母亲",
  },
  {
    pid: "son_parent",
    arity: 2,
    tags: [],
    fmt: "#1 是 #2 的儿子",
  },
  {
    pid: "daughter_parent",
    arity: 2,
    tags: [],
    fmt: "#1 是 #2 的女儿",
  },
];

export default builtinRelT;
