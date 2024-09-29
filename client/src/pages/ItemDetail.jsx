import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";

const ItemDetail = () => {
  const { id } = useParams();
  const { singleItem, getSingleItem } = useContext(ItemContext);

  useEffect(() => {
    getSingleItem(id);
    console.log(singleItem);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{singleItem?.item?.name}</h1>
      <h1>Price - {singleItem?.item?.price}</h1>
      <h1>Stock - {singleItem?.item?.stock}</h1>
      <h1 className="my-5">People who ordered</h1>
      <div className="flex flex-col items-center justify-center gap-2">
        {singleItem.customerDetails?.map((data) => {
          return (
            <Link
              className=" cursor-pointer underline"
              to={`/customer/${data.id}`}
              key={data.name}
            >
              {data.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ItemDetail;
