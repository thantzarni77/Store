import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const { itemName, price, stock, setItemName, setPrice, setStock } =
    useContext(ItemContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    const itemData = {
      name: itemName,
      price: price,
      stock: stock,
    };
    setItemName("");
    setPrice("");
    setStock("");

    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_SERVER}/additem`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    navigate("/items");
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center flex-col mt-5">
        <h1>Add Items</h1>
        <form
          method="post"
          className="w-2/3 flex flex-col justify-center items-center"
          onSubmit={submitHandler}
        >
          <div className="w-full m-2 flex flex-col justify-center items-center">
            <label htmlFor="name" className="m-1 self-start">
              Item Name
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter Item Name...."
              className="border-2 border-red-200 w-full m-1 rounded-lg focus:outline-none indent-3 p-1"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              value={itemName}
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
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
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
              onChange={(e) => {
                setStock(e.target.value);
              }}
              value={stock}
            />
          </div>
          <button className="p-2 rounded-lg bg-red-200 mt-2" type="submit">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
