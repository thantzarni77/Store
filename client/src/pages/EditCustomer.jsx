import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../context/ItemContext";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const { allItems, getItems } = useContext(ItemContext);
  const [user, setUser] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getItems();
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/customer/${id}`
    );
    const data = await response.json();
    setUser(data[0].name);
    setNote(data[0].note);

    const existingCheckedItems = data[0].items || [];
    const prefilledCheckedItems = allItems
      .map((item) => {
        const existingItem = existingCheckedItems.find(
          (checkedItem) => checkedItem.name === item.name
        );
        return existingItem
          ? {
              id: item._id, // Add the id
              name: item.name,
              price: item.price, // Add the price
              stock: item.stock, // Add the stock
              quantity: existingItem.quantity,
            }
          : null;
      })
      .filter(Boolean); // Filter out null values

    setCheckedItems(prefilledCheckedItems);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      const selectedItem = allItems.find((item) => item.name === value);
      if (selectedItem) {
        setCheckedItems((prev) => [
          ...prev,
          {
            id: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            stock: selectedItem.stock,
            quantity: 1,
          },
        ]);
      }
    } else {
      setCheckedItems((prev) => prev.filter((item) => item.name !== value));
    }
  };

  const handleQuantityChange = (itemName, quantity) => {
    setCheckedItems((prev) =>
      prev.map((item) =>
        item.name === itemName
          ? { ...item, quantity: parseInt(quantity, 10) }
          : item
      )
    );
  };

  const incrementQuantity = (itemName) => {
    setCheckedItems((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemName) => {
    setCheckedItems((prev) =>
      prev.map((item) =>
        item.name === itemName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const itemData = { id, user, note, checkedItems };

    console.log(itemData);

    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/edit/customer/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      }
    );

    if (response.ok) {
      navigate("/customers");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center flex-col mt-5">
        <h1>Edit Customer</h1>
        <form
          className="w-2/3 flex flex-col justify-center items-center"
          onSubmit={submitHandler}
        >
          <div className="w-full m-2 flex flex-col justify-center items-center">
            <label htmlFor="name" className="m-1 self-start">
              Customer Name
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter Customer Name..."
              className="border-2 border-red-200 w-full m-1 rounded-lg focus:outline-none indent-3 p-1"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </div>
          <div className="flex gap-2">
            {allItems.map((item) => {
              const isChecked = checkedItems.find(
                (checkedItem) => checkedItem.name === item.name
              );
              return (
                <div key={item.name} className="flex items-center flex-col">
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={!!isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={item.name} className="ml-1">
                    {item.name}
                  </label>
                  {isChecked && (
                    <div className="flex items-center ml-2">
                      <button
                        type="button"
                        onClick={() => decrementQuantity(item.name)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={isChecked.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.name, e.target.value)
                        }
                        className="border-2 border-gray-300 rounded p-1 w-16 mx-1"
                      />
                      <button
                        type="button"
                        onClick={() => incrementQuantity(item.name)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full m-2 flex flex-col justify-center items-center">
            <label htmlFor="note" className="m-1 self-start">
              Note
            </label>
            <input
              type="text"
              name="note"
              placeholder="Enter note..."
              className="border-2 h-14 border-red-200 w-full m-1 rounded-lg focus:outline-none indent-3 p-1"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </div>
          <button className="p-2 rounded-lg bg-red-200 mt-2" type="submit">
            Update Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
