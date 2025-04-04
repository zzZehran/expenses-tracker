const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/expenseTracker")
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Some error occured"));

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

const demoExpense = new Expense({
  name: "Demo expense",
  amount: 50,
  category: "personal",
});

demoExpense.save();

app.get("/", (req, res) => {
  res.send({ message: "You have reached express!" });
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

app.listen(3000, () => {
  console.log("On port 3000!");
});
