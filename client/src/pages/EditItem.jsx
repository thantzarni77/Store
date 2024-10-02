import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../context/ItemContext";
import { useNavigate, useParams } from "react-router-dom";

const EditItem = () => {
  const { oldItem, getOldItem } = useContext(ItemContext);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      getOldItem(id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setNewName(oldItem.name);
    setNewPrice(oldItem.price);
    setNewStock(oldItem.stock);
  }, [oldItem]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const itemData = {
      name: newName,
      price: newPrice,
      stock: newStock,
    };
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/edit/item/${id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      }
    );

    if (response.ok) {
      navigate("/items");
    } else {
      console.error("Failed to update item");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center flex-col mt-5">
        <h1>Edit Item</h1>
        <form
          className="w-2/3 flex flex-col justify-center items-center"
          onSubmit={submitHandler}
        >
          <div className="w-full m-2 flex flex-col justify-center items-center">
            <label htmlFor="name" className="m-1 self-start">
              Item Name
            </label>
            <input
              disabled
              type="text"
              name="name"
              placeholder="Enter Item Name...."
              className="border-2 border-red-200 w-full m-1 rounded-lg focus:outline-none indent-3 p-1"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
          </div>
          <div className="w-full m-2 flex flex-col justify-center items-center">
            <label htmlFor="price" className="m-1 self-start">
              Item Price
            </label>
            <input
              required
              type="text"
              name="price"
              placeholder="Enter Item Price...."
              className="border-2 border-red-200 w-full m-1 rounded-lg focus:outline-none indent-3 p-1"
              onChange={(e) => setNewPrice(e.target.value)}
              value={newPrice}
            />
          </div>
          <div className="w-full m-2 flex flex-col justify-center items-center">
            <label htmlFor="stock" className="m-1 self-start">
              Stock
            </label>
            <input
              required
              type="text"
              name="stock"
              placeholder="Enter Stock Count...."
              className="border-2 border-red-200 w-full m-1 rounded-lg focus:outline-none indent-3 p-1"
              onChange={(e) => setNewStock(e.target.value)}
              value={newStock}
            />
          </div>
          <button className="p-2 rounded-lg bg-red-200 mt-2" type="submit">
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
