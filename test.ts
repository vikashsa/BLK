//const datetime = require("datetime");
//const jshash = require("jshashes");

class blockchain {
  constructor() {
    console.log("Constructor Initiated");
    this.chain = [1, 2];
    this.create_block((proof = 1), (previous_hash = "0"));
  }

  create_block(proof, previous_hash) {
    console.log("Hi how are u");
  }
}

/*function myfunction() {
  console.log("my function");
  display = () => {
    console.log("display function");
  };
  //display();
}*/

let bl = new blockchain();
bl.create_block("a", "b");
