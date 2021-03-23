const fs = require("fs");
const path = require("path");
var accountData = fs.readFileSync("src/json/accounts.json", {
  encoding: "UTF8"
});
const accounts = JSON.parse(accountData);
var userData = fs.readFileSync("src/json/users.json", {
  encoding: "UTF8"
});
const users = JSON.parse(userData);
const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(
    path.join(__dirname, "../src/json/accounts.json"),
    accountsJSON,

    "UTF-8"
  );
};
module.exports = {
  users,
  accounts,
  writeJSON
};
