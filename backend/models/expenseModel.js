const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      min: 0,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceContact",
    },
    type: {
      type: String,
      enum: ["purchases", "maintenance", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "canceled"],
      default: "pending",
    },
    paidAt: Date,
    paymentMethod: {
      type: String,
      enum: ["cash", "bank-transfer", "online"],
    },
    estate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estate",
    },
    compound: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Compound",
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LandlordContact",
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
  },
  { timestamps: true }
);

expenseSchema.index({ account: 1 });
expenseSchema.index({ status: 1 });
expenseSchema.index({ estate: 1 });
expenseSchema.index({ compound: 1 });

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
