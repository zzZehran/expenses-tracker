const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
