const { Schema, model, default: mongoose } = require("mongoose");

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  items: [
    {
      type: Object,
      ref: "Item",
      quantity: String,
    },
  ],
});

const customerModel = model("Customer", customerSchema);

module.exports = customerModel;
