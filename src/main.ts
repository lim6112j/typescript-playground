import { ComplexCommand, Receiver, SimpleCommand } from "./lib/command";
import crud from "./lib/crud";
import { user } from "./lib/interface";
import { Invoker } from "./lib/command";
const mycrud = new crud();
console.log(mycrud.name);
console.log(user);
// FP: object CRUD with no mutation
const obj = { id: "1", name: "ben", phone: "1231231232" };
//add
const objAdded = { ...obj, extra: "new Data" };
console.log("objBefore", obj);
console.log("objAdded", objAdded);
//remove
const { extra, ...objRemoved } = objAdded;
console.log("objremoved", objRemoved);
// update
const updatedObj = { ...objRemoved, name: "jane" };
console.log("updated", updatedObj);

// FP: Array CRUD with no mutation
const arr = [
  { id: 1, name: "Ben", phone: "3423423423" },
  { id: 2, name: "Tom", phone: "42234234" },
  { id: 3, name: "Lim", phone: "5646456456" },
  { id: 4, name: "Jane", phone: "123123123" },
];
// add
const addedArr = [...arr, { id: 5, name: "july", phone: "678678678" }];
console.log("addedArr", addedArr);
//update
const updatedArr = addedArr.map(updateDesc);
function updateDesc(user: { name: string }) {
  if (user.name === "Lim") {
    return { ...user, phone: "000" };
  }
  return user;
}
console.log("updatedArr", updatedArr);
// remove
const removedArr = updatedArr.filter(removeObj);
function removeObj(obj: { name: string }) {
  return obj.name !== "Lim";
}
console.log("removedArr", removedArr);

function argsPrint(str: string) {
  const args = [...arguments];
  console.log(args[0]);
}
argsPrint("hello world");

// command pattern
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));
invoker.doSomethingImportant();
