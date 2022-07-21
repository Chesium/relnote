import relnote from "./relnote";
import builtinFrontend from "./builtinFrontend";
// import log from "./log";

const app=new relnote("/json",new builtinFrontend());
(<any>window).app=app; //调试
// (<any>window).sprintf=sprintf; //调试

async function test() {
  for (let i = 1; i <= 40; i++) {
    await app.addCharacter(`T${i}`);
  }
  // await addCharacter("23_HAHAH");
  // await addCharacter("-——_简介");
  // await app.getCharacterList();
  // await app.addRelById(1,0,"father");
  // await app.addRelById(2,0,"mother");
  // await app.addRelById(0,1,"son");
  // await app.addRelById(0,2,"son");
  await app.addR(["T2", "T1"], "father_child");
  await app.addR(["T3", "T1"], "mother_child");
  await app.addR(["T1", "T2"], "son_parent");
  await app.addR(["T1", "T3"], "son_parent");
  // await app.allRel();
  // await app.getallR("son");
  // await app.findR_lr("l", "T1", "father");
  // await app.findR_lr("r", "T1", "son");
  // await app.findR_lr("l", "T2", "son");
  // await app.findR_lr("r", "T3", "mother");
  // await app.findR_lr("l", "T3", "mother");
  // setof(A:B:R,rel(A,B,R),L)
}

(<any>window).log = app.f.log;

(<any>window).test = () => {
  let start = performance.now();
  let res = test();
  res.then(() => {
    let end = performance.now();
    console.log(`use ${end - start} ms`);
  });
};
