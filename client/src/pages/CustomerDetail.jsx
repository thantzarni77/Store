import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";

const CustomerDetail = () => {
  const navigate = useNavigate();
  const { getItems, customerData, getCustomerData } = useContext(ItemContext);
  const [total, setTotal] = useState();
  const { id } = useParams();

  useEffect(() => {
    getCustomerData(id);
    calculateSubtotal();
  }, [customerData]);

  const calculateSubtotal = () => {
    const subtotals =
      customerData[0]?.items.map((data) => data.price * data.quantity) || [];

    const Alltotal = subtotals.reduce((acc, each) => acc + each, 0);

    setTotal(Alltotal); // Log the calculated total
  };

  const updateStock = async (itemID, cStock, cQ) => {
    const newStock = Number(cStock) - Number(cQ); // Calculate new stock
    if (newStock < 0) {
      console.error("Stock cannot be negative for item ID:", itemID);
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/item/${itemID}`,
      {
        method: "POST",
        body: JSON.stringify({
          id: itemID,
          stock: newStock,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Error updating stock for item ID:", itemID, error.message);
    } else {
    }
  };

  const deleteCustomer = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/customer/${id}`,
      {
        method: "delete",
      }
    );
    getItems();
    navigate("/customers");
  };

  const orderFinishHandle = async () => {
    try {
      // Update stock for all items
      await Promise.all(
        customerData[0]?.items?.map(async (data) => {
          await updateStock(data.id, data.stock, data.quantity);
        })
      );

      // Now delete the customer after updating stock
      await deleteCustomer();
    } catch (error) {
      console.error("Error finishing order:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col m-4">
      <div className="m-4">{customerData[0]?.name}</div>
      <div className="flex justify-center items-center my-5">Orders</div>
      <table className="border-2 border-red-200 w-[80%]">
        <thead>
          <tr>
            <td>Item Name</td>
            <td className="mx-5">Price </td>
            <td>Quantity</td>
            <td>Subtotal</td>
          </tr>
        </thead>
        <tbody>
          {customerData[0]?.items.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>{data.quantity}</td>
                <td>{data.price * data.quantity}</td>
              </tr>
            );
          })}
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
      {customerData[0]?.note && (
        <div className="flex flex-col gap-5 items-center justify-center">
          <div>-- Note --</div>
          <div>{customerData[0]?.note}</div>
        </div>
      )}
      <div
        className="p-2 rounded-lg bg-red-100 mt-5"
        onClick={orderFinishHandle}
      >
        Order Finished
      </div>
    </div>
  );
};

export default CustomerDetail;
