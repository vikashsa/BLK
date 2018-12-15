const sha = require("sha256");
const express = require("express");
var bodyParser = require("body-parser");

class Blockchain {
  constructor(chain, proof, previous_hash) {
    this.chain = chain;
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
    let lastindex = blockchain.chain.length - 1;
    return blockchain.chain[lastindex];
    console.log(chain);
  }

  proof_of_work(previous_proof) {
    let new_proof = 2;
    let check_proof = false;
    let hash_operation;
    while (check_proof == false) {
      hash_operation = new_proof * 2 - previous_proof * 2;
      hash_operation = hash_operation.toString(8);
      hash_operation = sha(hash_operation);
      hash_operation = hash_operation.toString("hex");
      hash_operation = hash_operation.substring(0, 2);
      if (hash_operation == "00") check_proof = true;
      else new_proof += 1;
    }
    return new_proof;
  }

  hash(block) {
    let encoded_block = JSON.stringify(block);
    encoded_block = sha(encoded_block);
    encoded_block = encoded_block.toString("hex");
    return encoded_block;
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
      if (hash_operation == "00") return false;
      previous_block = block;
      block_index += 1;
      return true;
    }
  }
}
var app = express();

let blockchain = new Blockchain([], 1, 0);

app.get("/mine_block", (req, res) => {
  let previous_block = blockchain.get_previous_block();
  let previous_proof = previous_block["proof"];
  proof = blockchain.proof_of_work(previous_proof);
  previous_hash = blockchain.hash(previous_block);
  let block = Blockchain.create_block(blockchain.chain, proof, previous_hash);
  let response = {
    message: "congrats, you just minded a block",
    index: block["index"],
    timestamp: block["timestamp"],
    proof: block["proof"],
    previous_hash: block["previous_hash"]
  };
  response = JSON.stringify(response);
  res.send(response, 200);
});

app.get("/get_chain", (req, res) => {
  let response = {
    chain: blockchain.chain,
    length: blockchain.chain.length
  };
  response = JSON.stringify(response);
  res.send(response, 200);
});

app.get("/is_valid", (req, res) => {
  let is_valid = blockchain.is_chain_valid(blockchain.chain);
  let response;
  if (is_valid) response = { message: "The chain is valid" };
  else response = { message: "Chain is not valid" };
  response = JSON.stringify(response);
  res.send(response, 200);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/add_transaction", (req, res) => {
  console.log(req.body);
  let json = req.body;
  console.log(json);
  console.log(json["name"]);
  //console.log(`printing body${req.body}`);
  //console.log(`JSON as sent from post request is ${json}`);
  //console.log(`the internal field is ${json[name]}`);
  //  let transaction_keys = ["sender", "receiver", "amount"];
  //console.log(req.body.name);
  //let response;
  //let index = blockchain.add_transaction(
  //req.body["sender"],
  //  req.body["receiver"],
  //  req.body["amount"]
  //);
  //console.log(`the index is ${index}`);
  //res.send(res, 200);
});

app.listen("4001", () => {
  console.log("Server is up on port 4001");
});
