import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";

const Item = ({ id, name, price, stock }) => {
  const { getItems } = useContext(ItemContext);
  const deleteItem = async () => {
    if (confirm("Are you sure?")) {
      await fetch(`${import.meta.env.VITE_SERVER}/item/${id}`, {
        method: "delete",
      });
      getItems();
    } else {
      return;
    }
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
    <div className="border-2 m-auto border-red-300 p-1 w-[95%] rounded-lg my-2 cursor-pointer flex flex-col gap-4 items-center justify-left text-left">
      <h1 className="text-red-400 font-semibold">{name}</h1>
      <div className="flex gap-5 items-center">
        <p>Price - {price}</p>
        <p>Stock - {stock}</p>
        <Link
          className="hover:text-red-300"
          to={`http://localhost:5173/item/${id}`}
        >
          Details
        </Link>
        <div className="flex gap-5">
          <button className="hover:text-red-300" onClick={deleteItem}>
            Delete
          </button>
          <Link className="hover:text-red-300" to={`/edit/item/${id}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
