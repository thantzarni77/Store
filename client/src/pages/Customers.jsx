import { Link } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";
import { useContext, useEffect } from "react";

const Customers = () => {
  const { allCustomers, getAllCustomers } = useContext(ItemContext);

  useEffect(() => {
    getAllCustomers();
  }, []);
  return (
    <div className="my-5 flex flex-col mx-auto items-center justify-center">
      <h1 className="my-2 text-xl">Customer List</h1>
      {allCustomers.map((customer) => {
        return (
          <div
            className="flex gap-3 w-[90%] items-center justify-between border-2 border-red-200 p-4 rounded-lg my-2"
            key={customer.name}
          >
            <h1>{customer.name}</h1>
            <Link
              className="hover:text-red-400"
              to={`/customer/${customer._id}`}
            >
              View
            </Link>
            <Link
              className="hover:text-red-400"
              to={`/edit/customer/${customer._id}`}
            >
              Edit
            </Link>
          </div>
        );
      })}
      <Link
        className="bg-red-100 mx-4 p-3 hover:bg-blue-300 rounded-lg"
        to="/addcustomer"
      >
        Add customer
      </Link>
      <a href="#nav">
        {" "}
        <div className=" self-end fixed right-5 bottom-5 z-10 text-2xl font-extrabold border-[10px] bg-red-200 rounded-full px-2 border-red-200">
          ↑
        </div>
      </a>
    </div>
  );
};

export default Customers;
