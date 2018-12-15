//http://127.0.0.1:5000/

const urllib = require("urllib");
const url = require("url");

const myURL = new URL("http://127.0.0.1:5000");

console.log(myURL.port);
console.log(myURL.hostname);
//const myURL = new URL("https://abc:xyz@example.com");
