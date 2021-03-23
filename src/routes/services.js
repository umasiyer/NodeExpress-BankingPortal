var express = require("express");
var { accounts, writeJSON } = require("../data");
var router = express.Router();
router.get("/transfer", function(req, res) {
  res.render("transfer", { user: users[0] });
});
router.post("/transfer", function(req, res) {
  var amount = parseInt(req.body.amount);
  var currentFromBalance = accounts[req.body.from].balance;
  accounts[req.body.from].balance = currentFromBalance - amount;
  var currentToBalance = accounts[req.body.to].balance;
  accounts[req.body.to].balance = currentToBalance + amount;
  const accountsJSON = JSON.stringify(accounts);
  writeJSON();
  res.render("transfer", { message: "Transfer Completed" });
});
router.get("/payment", function(req, res) {
  res.render("payment", { account: accounts.credit });
});
router.post("/payment", function(req, res) {
  accounts.credit.balance =
    parseInt(accounts.credit.balance) - parseInt(req.body.amount);
  accounts.credit.available =
    parseInt(accounts.credit.available) + parseInt(req.body.amount);
  const accountsJSON = JSON.stringify(accounts);
  writeJSON();
  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit
  });
});
module.exports = router;
