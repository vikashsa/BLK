const sha = require("sha256");
const express = require("express");

class Blockchain {
  constructor(chain, proof, previous_hash) {
    this.chain = [];
    this.proof = proof;
    this.previous_hash = previous_hash;
    Blockchain.create_block(this.chain, this.proof, this.previous_hash);
  }
  static create_block(chain, proof, previous_hash) {
    let block = {
      index: chain.length + 1,
      timestamp: Date.now(),
      proof: proof,
      previous_hash: previous_hash
    };
    chain.push(block);
    console.log(block);
    return block;
  }
  get_previous_block() {
    return this.chain["0"];
    console.log(chain);
  }

  proof_of_work(previous_proof) {
    let new_proof = 1;
    let check_proof = false;
    let hash_operation;

    while (check_proof == false) {
      hash_operation = new_proof * 2 - previous_proof * 2;
      hash_operation = hash_operation.toString(8);
      hash_operation = sha(hash_operation);
      hash_operation = hash_operation.toString("hex");
      hash_operation = hash_operation.substring(0, 2);
      console.log(hash_operation);
      if (hash_operation == "00") check_proof = true;
      else new_proof += 1;
    }
    console.log(new_proof);
  }

  hash(block) {
    let encoded_block = JSON.stringify(block);
    encoded_block = sha(encoded_block);
    encoded_block = encoded_block.toString("hex");
    console.log(encoded_block);
  }

  is_chain_valid(chain) {
    let previous_block = chain[0];
    let block_index = 1;
    let new_proof;
    let hash_operation;
    while (block_index < chain.length) {
      let block = chain[block_index];
      if (block["previous_hash"] != blockchain.hash(previous_block))
        return false;
      let previous_proof = previous_block["proof"];
      hash_operation = new_proof * 2 - previous_proof * 2;
      hash_operation = hash_operation.toString(8);
      hash_operation = sha(hash_operation);
      hash_operation = hash_operation.toString("hex");
      hash_operation = hash_operation.substring(0, 2);
      if (hash_operation == "00")
        //console.log(`The value of block is${block}`);
        return false;
      previous_block = block;
      block_index += 1;
      return true;
    }
  }
}

var app = express();
let blockchain = new Blockchain([], 1, 0);
app.get("/mine_block", (req, res) => {
  //  res.send("Hello Express!");
  //let blockchain = new blockchain();

  let previous_block = blockchain.get_previous_block();

  let previous_proof = previous_block["proof"];
  proof = blockchain.proof_of_work(previous_proof);
  previous_hash = blockchain.hash(previous_block);
  let block = blockchain.create_block(proof, previous_hash);
  let response = {
    message: "congrats, you just minded a block",
    index: block["index"],
    timestamp: block["timestamp"],
    proof: block["proof"],
    previous_hash: block["previous_hash"]
  };
  response = JSON.stringify(response);
  res.send(response, 200);
  //  res.send(previous_block, 200);
});

app.get("/get_chain", (req, res) => {
  let response = {
    chain: blockchain.chain,
    length: blockchain.chain.length
  };
  response = JSON.stringify(response);

  res.send(response, 200);
});

app.listen("4000", () => {
  console.log("Server is up on port 4000");
});

/*blockchain.proof_of_work(5);
blockchain.hash("a");
console.log(newobject.is_chain_valid([1, 3]));*/
