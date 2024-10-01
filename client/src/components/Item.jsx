import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";

const Item = ({ id, name, price, stock }) => {
  const navigate = useNavigate();
  const { getItems } = useContext(ItemContext);
  const deleteItem = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/item/${id}`, {
      method: "delete",
    });
    getItems();
  };

  // const updateStock = async (action) => {
  //   if (action == "m") {
  //     stock = Number(stock) - 1;
  //   } else if (action == "p") {
  //     stock = Number(stock) + 1;
  //   }
  //   const response = await fetch(`${import.meta.env.VITE_SERVER}/item/${id}`, {
  //     method: "post",
  //     body: JSON.stringify({
  //       id,
  //       stock,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   getItems();
  // };
  return (
    <div className="border-2 border-red-300 p-5 w-[20%] rounded-lg m-2 cursor-pointer">
      <h1>{name}</h1>
      <p>Price - {price}</p>
      <div className="flex gap-3">
        <p>Stock - {stock}</p>
      </div>
      <Link to={`http://localhost:5173/item/${id}`}>View details</Link>
      <div className="flex gap-5">
        <button onClick={deleteItem}>Delete Item</button>
        <Link to={`/edit/item/${id}`}>Edit Item</Link>
      </div>
    </div>
  );
};

export default Item;
