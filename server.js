const express = require("express");
var app = express();

app.use(express.static(__dirname + "/node-web-server/public"));
app.get("/", (req, res) => {
  //  res.send("Hello Express!");

  res.send({
    name: "Vikas",
    likes: ["Coding", "Dreaming"]
  });
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen("3000", () => {
  console.log("Server is up on port 3000");
});
