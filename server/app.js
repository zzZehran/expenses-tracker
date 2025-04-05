const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
require("./utils/db");

const Expense = require("./models/Expenses");
const User = require("./models/User");

app.use(cors());
app.use(express.json());

const sessionOptions = {
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

const demoExpense = new Expense({
  name: "Demo expense",
  amount: 50,
  category: "personal",
});
demoExpense.save();

app.get("/admin", (req, res) => {
  if (!req.session.user._id) {
    res.redirect("/register");
  }
  res.send({ message: "You are the chosen one!" });
});

app.get("/register", async (req, res) => {});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  // await user.save();
  res.send({ user });
});

app.get("/", (req, res) => {
  res.send({ message: "You have reached express!" });
});

app.get("/api/expenses", async (req, res) => {
  console.log("get on /expenses");
  const allExpenses = await Expense.find({});
  res.send({ message: "Expenses fetched successfully.", allExpenses });
});

app.post("/api/expenses", async (req, res) => {
  setTimeout(async () => {
    const { name, amount, category } = req.body;
    const newExpense = new Expense({ name, amount, category });
    await newExpense.save();
    res.send({ message: "Successfully added." });
  }, 500);
});

app.delete("/api/expenses", (req, res) => {
  setTimeout(async () => {
    const { id } = req.body;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    console.log(deletedExpense);
    res.send({ message: "Deleted" });
  }, 500);
});

app.delete("/api/expenses/all", (req, res) => {
  setTimeout(async () => {
    const deletedExpenses = await Expense.deleteMany({});
    console.log(deletedExpenses);
    res.send({ message: "Deleted all" });
  }, 500);
});

app.listen(3000, () => {
  console.log("On port 3000!");
});
