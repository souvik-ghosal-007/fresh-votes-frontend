import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  function takeFirst10Words(inputString) {
    const words = inputString.split(" ");

    let first10Words;
    if (words.length > 9) {
      first10Words = words.slice(0, 10);
      let result = first10Words.join(" ");
      return result + " . . .";
    }

    return inputString;
  }

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center justify-between w-full m-4 border-[2px] border-blue-300 bg-blue-100 p-2 rounded "
    >
      <div className="pl-2">
        <div>
          <span className="text-xl font-bold">{product.name}</span>
        </div>
        <div>
          <span className="text-md font-semibold">
            {takeFirst10Words(product.description)}
          </span>
        </div>
      </div>
      <div className="pr-2">
        {product.published ? (
          <div className={` bg-green-500 px-1 py-0.5 rounded`}>
            <span className="text-sm">Published</span>
          </div>
        ) : (
          <div className={`bg-gray-300 px-1 py-0.5 rounded`}>
            <span className="text-sm">Not Published</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
