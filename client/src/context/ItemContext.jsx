import { createContext, useState } from "react";

export const ItemContext = createContext();

const ItemContextProvider = ({ children }) => {
  const [allItems, setAllItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [singleItem, setSingleItem] = useState([]);
  const [oldItem, setOldItem] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [user, setUser] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [allCustomers, SetAllCustomers] = useState([]);

  const getItems = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/items`);
    const data = await response.json();
    setAllItems(data);
  };

  const getSingleItem = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/item/${id}`);
    const data = await response.json();
    setSingleItem(data);
  };

  const getOldItem = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/edit/item/${id}`
    );
    const data = await response.json();
    setOldItem(data);
  };

  const getCustomerData = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/customer/${id}`
    );
    const data = await response.json();
    setCustomerData(data);
  };

  const getAllCustomers = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/customers`);
    const data = await response.json();
    SetAllCustomers(data);
  };

  const values = {
    allItems,
    setAllItems,
    itemName,
    setItemName,
    price,
    setPrice,
    stock,
    setStock,
    getItems,
    user,
    setUser,
    allCustomers,
    getAllCustomers,
    SetAllCustomers,
    singleItem,
    setSingleItem,
    getSingleItem,
    customerData,
    setCustomerData,
    getCustomerData,
    oldItem,
    getOldItem,
    setOldItem,
  };

  return <ItemContext.Provider value={values}>{children}</ItemContext.Provider>;
};

export default ItemContextProvider;
