const sha = require("sha256");
const express = require("express");
const request = require("request");
const uuidv4 = require("uuid/v4");
const url = require("url");
var bodyParser = require("body-parser");

class Blockchain {
  constructor(chain, transactions, nodes, proof, previous_hash) {
    this.chain = chain;
    this.proof = proof;
    this.transactions = transactions;
    this.previous_hash = previous_hash;
    this.nodes = nodes;
    Blockchain.create_block(
      this.chain,
      this.transactions,
      this.proof,
      this.previous_hash,
      this.nodes
    );
  }
  static create_block(chain, transactions, proof, previous_hash) {
    let block = {
      index: chain.length + 1,
      timestamp: Date.now(),
      proof: proof,
      previous_hash: previous_hash,
      transactions: transactions
    };
    transactions = [];
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

  add_transaction(sender, receiver, amount) {
    blockchain.transactions.push({
      sender: sender,
      receiver: receiver,
      amount: amount
    });
    console.log(blockchain.transactions);

    let previous_block = blockchain.get_previous_block;
    return previous_block["index"] + 1; // it was previous_block +1
  }

  add_nodes(address) {
    let parsed_url = new URL(address);
    //console.log(parsed_url);
    let full_address = parsed_url.hostname + parsed_url.port;
    //console.log(full_address);
    blockchain.nodes.add(full_address);
    //console.log(blockchain.nodes);
  }

  replace_chain(chain) {
    let network = chain.nodes;
    let longest_chain;
    let max_length = chain.length;
    for (let node of network) {
      let response = request(
        {
          url: "https://{node}/get_chain",
          json: true
        },
        (error, response, body) => {}
      );
      if (response.status_code == 200) {
        let lenght = response[length];
        chain = response[chain];

        if (length > max_length && blockchain.is_chain_valid(chain)) {
          max_length = length;
          longest_chain = chain;
        }
      }
      if (longest_chain) {
        chain = longest_chain;
        return True;
      }
      return False;
    }
  }
}

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let node_address = toString(uuidv4().replace("_", ""));
console.log(node_address);
let animals = new Set();
let blockchain = new Blockchain([], [], animals, 1, 0);

app.get("/mine_block", (req, res) => {
  let previous_block = blockchain.get_previous_block();
  let previous_proof = previous_block["proof"];
  proof = blockchain.proof_of_work(previous_proof);
  previous_hash = blockchain.hash(previous_block);
  let newtransaction = [];
  newtransaction.push({
    sender: "Vikash",
    receiver: "Jaydeep",
    amount: 1
  });
  let block = Blockchain.create_block(
    blockchain.chain,
    newtransaction,
    proof,
    previous_hash
  );
  let response = {
    message: "congrats, you just minded a block",
    index: block["index"],
    timestamp: block["timestamp"],
    proof: block["proof"],
    previous_hash: block["previous_hash"],
    transactions: block["transactions"]
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

app.post("/add_transaction", (req, res) => {
  let json = req.body;

  console.log(`printing body${req.body}`);
  console.log(`JSON as sent from post request is ${json}`);

  let index = blockchain.add_transaction(
    req.body["sender"],
    req.body["receiver"],
    req.body["amount"]
  );
  console.log(`the index is ${index}`);
  let response = {
    message: `This transaction will be added to block ${index}`
  };
  response = JSON.stringify(response);
  res.send(response, 201);
});

app.post("/connect_node", (req, res) => {
  console.log(req.body);
  let requestvariable = req.body;
  let nodes1 = requestvariable["nodes"];
  //console.log(nodes1);

  if (!nodes1) {
    return "NoNode", 400;
  }
  nodes1.forEach(element => {
    //console.log(element);
    blockchain.add_nodes(element);
  });

  //let addedNodes = JSON.parse(blockchain.nodes);
  console.log(blockchain.nodes);
  //console.log(addedNodes);
  let response = {
    message: `All Nodes are connected, the vcoin blockchain now contains the following nodes : ${
      blockchain.nodes
    }`
  };
  console.log(response);
  //response = "abcde";

  res.send(response, 201);
});

app.get("/replace_chain", (req, res) => {
  let is_chain_replaced = blockchain.replace_chain(blockchain.chain);
  let response;
  if (is_chain_replaced) {
    response = {
      message:
        "The nodes had different chain so the chain was replaced by the longest chain",
      new_chain: blockchain.chain
    };
  } else {
    response = {
      message: "All good, the chain is the largest one",
      actual_chain: blockchain.chain
    };
  }
  response = JSON.parse(response);
  res.send(response, 200);
});

app.listen("5001", () => {
  console.log("Server is up on port 5001");
});
