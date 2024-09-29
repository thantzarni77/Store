const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  customers: [
    {
      type: Object,
      ref: "Customer",
    },
  ],
});

const itemModel = model("Item", itemSchema);

module.exports = itemModel;
