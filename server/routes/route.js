const express = require("express");
const itemController = require("../controller/itemController");
const userController = require("../controller/userController");

const router = express.Router();

//get all items
router.get("/items", itemController.getAllItems);

//get single item
router.get("/item/:id", itemController.getSingleItem);

//delete single item
router.delete("/item/:id", itemController.deleteItem);

//adding item
router.post("/additem", itemController.addItem);

//update item
router.post("/item/:id", itemController.updateItemStock);

//adding customer
router.post("/addcustomer", userController.createCustomer);

//get all customers
router.get("/customers", userController.getAllCustomers);

//get single customer
router.get("/customer/:id", userController.getSingleCustomer);

//delete customer
router.delete("/customer/:id", userController.deleteCustomer);

module.exports = router;
