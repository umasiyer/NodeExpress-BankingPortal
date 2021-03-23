const fs = require("fs");
const path = require("path");
const express = require("express");
const { users, accounts, writeJSON } = require("./data");
const accountRoutes = require("./routes/accounts");
const servicesRoutes = require("./routes/services");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);
app.get("/", function(req, res) {
  res.render("index", { title: "Account Summary", accounts });
});

app.get("/profile", function(req, res) {
  res.render("profile", { user: users[0] });
});

app.listen(3000, function() {
  console.log("PS Project Running on port 3000!");
});
