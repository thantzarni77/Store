import { Link } from "react-router-dom";
import Item from "../components/Item";
import { ItemContext } from "../context/ItemContext";
import { useContext, useEffect } from "react";

const Items = () => {
  const { allItems, getItems } = useContext(ItemContext);
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center m-5">
      <h1 className="text-xl">List of Items</h1>
      <Link to={"/customers"} className="mt-5 underline">
        GO TO CUSTOMER LISTS
      </Link>
      <div className="w-full flex items-center justify-center mt-5">
        <div className="w-2/3 flex flex-wrap">
          {allItems.map((item) => {
            return (
              <Item
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                stock={item.stock}
              />
            );
          })}
        </div>
        <Link className="bg-red-100 p-5 rounded-lg" to="/addItem">
          add items
        </Link>
      </div>
      <hr className="w-full h-5 m-4" />
    </div>
  );
};

export default Items;
