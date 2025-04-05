const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
require("./utils/db");

const Expense = require("./models/Expenses");
const User = require("./models/User");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Express" });
});

app.get("/api/checkAuth", (req, res) => {
  if (!req.session.userId) {
    // res.status(401).send({ error: "Not logged in. Please login" });
    res.send({ loggedIn: false });
  } else {
    res.send({ loggedIn: true });
  }
});

app.get("/admin", (req, res) => {
  if (!req.session.user || !req.session.user._id) {
    return res.redirect("/register");
  }
  res.send({ message: "You are the chosen one!" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(404)
      .send({ error: "Invalid Credentials or user does not exist." });
  }
  const foundUser = await bcrypt.compare(password, user.password);
  if (!foundUser) {
    return res.status(401).send({ error: "Invalid Credentials" });
  }
  req.session.userId = user._id;
  res.send({ loggedIn: true });
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  await user.save();
  console.log(user);
  res.send({ message: "Registered Successfully!" });
});

app.get("/api/expenses", async (req, res) => {
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
