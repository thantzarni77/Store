const Customer = require("../models/Customer");
const Item = require("../models/Item");

exports.createCustomer = async (req, res) => {
  const { user, note, checkedItems } = req.body;

  try {
    // Extract item names from checkedItems
    const itemNames = checkedItems.map((item) => item.name);

    // Fetch all items whose names are in the itemNames array
    const items = await Item.find({ name: { $in: itemNames } }).sort({
      name: 1,
    });

    // Create the customer
    const customer = await Customer.create({ name: user, note });

    const quantities = checkedItems.map((item) => item.quantity);

    // Include the item's ID and stock in itemDetails
    const itemDetails = items.map((item, index) => ({
      id: item._id, // Add the item's ID
      name: item.name,
      price: item.price,
      stock: item.stock, // Add the item's stock
      quantity: quantities[index], // Add other fields as necessary
    }));

    customer.items = itemDetails;

    // Save the entire item objects in customer.items
    await customer.save();

    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the customer." });
  }
};

exports.getAllCustomers = (req, res) => {
  Customer.find()
    .sort({ name: 1 })
    .then((customers) => {
      if (customers) {
        res.status(200).json(customers);
      }
    });
};

exports.getSingleCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);

    const itemNames = await customer.items.map((item) => item.name);

    const items = await Item.find({ name: { $in: itemNames } }).sort({
      name: 1,
    });

    const itemDetails = items.map((item, index) => ({
      id: item._id, // Add the item's ID
      name: item.name,
      price: item.price,
      stock: item.stock, // Add the item's stock
      quantity: customer.items[index].quantity,
    }));

    customer.items = itemDetails;

    // Save the entire item objects in customer.items
    await customer.save();

    res.status(200).json([customer]);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCustomer = (req, res) => {
  const { id } = req.params;
  Customer.findByIdAndDelete(id).then(() => {
    res.status(300).json("deleted");
  });
};

exports.updateCustomer = async (req, res) => {
  const { id, user, note, checkedItems } = req.body;

  try {
    const customer = await Customer.findById(id);

    customer.name = user;
    customer.note = note;
    customer.items = checkedItems;

    await customer.save();

    res.status(200).json(customer);
  } catch (err) {
    console.log(err);
  }
};
