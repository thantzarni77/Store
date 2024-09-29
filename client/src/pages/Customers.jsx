import { Link } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";
import { useContext, useEffect } from "react";

const Customers = () => {
  const { allCustomers, getAllCustomers } = useContext(ItemContext);

  useEffect(() => {
    getAllCustomers();
  }, []);
  return (
    <div className="m-5 flex items-center justify-center">
      {allCustomers.map((customer) => {
        return (
          <div className="flex flex-col items-center justify-center border-2 border-red-200 p-4 rounded-lg">
            <h1>{customer.name}</h1>
            <Link to={`/customer/${customer._id}`}>View Orders</Link>
          </div>
        );
      })}
      <Link className="bg-red-100 mx-4 p-5 rounded-lg" to="/addcustomer">
        add customer
      </Link>
    </div>
  );
};

export default Customers;
