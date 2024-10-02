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
    <div className="w-full flex flex-col items-center justify-center my-5 mx-auto">
      <h1 className="text-xl">List of Items</h1>
      <div className="w-full flex items-center justify-center m-5">
        <div className="flex flex-col w-full md:flex-warp m-auto">
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
          <Link
            className="bg-red-100 hover:bg-blue-200 p-2 my-5 text-center w-[30%] self-center rounded-lg"
            to="/addItem"
          >
            Add items
          </Link>
          <a href="#nav">
            {" "}
            <div className=" self-end fixed right-5 bottom-5 z-10 text-2xl font-extrabold border-[10px] bg-red-200 rounded-full px-2 border-red-200">
              ↑
            </div>
          </a>
        </div>
      </div>
      <hr className="w-full h-5 m-4" />
    </div>
  );
};

export default Items;
