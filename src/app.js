const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

var accountData = fs.readFileSync("src/json/accounts.json", {
  encoding: "UTF8"
});
const accounts = JSON.parse(accountData);
var userData = fs.readFileSync("src/json/users.json", {
  encoding: "UTF8"
});
const users = JSON.parse(userData);

app.get("/", function(req, res) {
  res.render("index", { title: "Account Summary", accounts });
});
app.get("/savings", function(req, res) {
  res.render("account", { account: accounts.savings });
});
app.get("/checking", function(req, res) {
  res.render("account", { account: accounts.checking });
});
app.get("/credit", function(req, res) {
  res.render("account", { account: accounts.credit });
});
app.get("/profile", function(req, res) {
  res.render("profile", { user: users[0] });
});

app.get("/transfer", function(req, res) {
  res.render("transfer", { user: users[0] });
});
app.post("/transfer", function(req, res) {
  var amount = parseInt(req.body.amount);
  var currentFromBalance = accounts[req.body.from].balance;
  accounts[req.body.from].balance = currentFromBalance - amount;
  var currentToBalance = accounts[req.body.to].balance;
  accounts[req.body.to].balance = currentToBalance + amount;
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(
    path.join(__dirname, "../src/json/accounts.json"),
    accountsJSON,

    "UTF-8"
  );
  res.render("transfer", { message: "Transfer Completed" });
});
app.get("/payment", function(req, res) {
  res.render("payment", { account: accounts.credit });
});
app.post("/payment", function(req, res) {
  accounts.credit.balance =
    parseInt(accounts.credit.balance) - parseInt(req.body.amount);
  accounts.credit.available =
    parseInt(accounts.credit.available) + parseInt(req.body.amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(
    path.join(__dirname, "../src/json/accounts.json"),
    accountsJSON,

    "UTF-8"
  );
  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit
  });
});
app.listen(3000, function() {
  console.log("PS Project Running on port 3000!");
});
