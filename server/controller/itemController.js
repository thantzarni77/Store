const Item = require("../models/Item");
const Customer = require("../models/Customer");

exports.getAllItems = (req, res, next) => {
  Item.find()
    .sort({ name: 1 })
    .then((items) => {
      if (items) {
        res.status(200).json(items);
      }
    });
};

exports.getSingleItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id).populate("customers");

    // Find customers who ordered this item
    const customers = await Customer.find({ "items.name": item.name });

    // Create an array of objects containing both name and id
    const customerDetails = customers.map((customer) => ({
      id: customer._id,
      name: customer.name,
    }));

    res.status(200).json({ item, customerDetails });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving item or customers." });
  }
};

exports.addItem = (req, res, next) => {
  const { name, price, stock } = req.body;
  Item.create({
    name,
    price,
    stock,
    customers: [],
  });
  res.status(201).json("created");
};

exports.getOldItemData = (req, res) => {
  const { id } = req.params;

  Item.findById(id).then((data) => {
    res.status(200).json(data);
  });
};

exports.updateItemStock = (req, res) => {
  const { id, stock } = req.body;
  Item.findById(id)
    .then((item) => {
      item.stock = stock;
      return item.save();
    })
    .then(() => {
      res.status(203).json("Updated");
    });
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  Item.findById(id)
    .then((item) => {
      item.name = name;
      item.price = price;
      item.stock = stock;
      return item.save();
    })
    .then(() => {
      res.status(203).json("Updated");
    });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id).then(() => {
    res.status(300).json("deleted");
  });
};
