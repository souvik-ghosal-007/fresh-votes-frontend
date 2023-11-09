import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Feature = ({ feature, productId, authorised }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSearchParams({ authorised });
    navigate(`/products/${productId}/features/${feature.id}`);
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-between w-full m-4 border-[2px] border-orange-300 bg-orange-100 p-2 rounded "
      onClick={handleClick}
    >
      <div className="pl-2">
        <div>
          <span className="text-lg font-bold">{feature.title}</span>
        </div>
        <div>
          <span className="text-sm font-semibold">{feature.description}</span>
        </div>
      </div>
      <div className="pr-2">
        {feature.status === "open" ? (
          <div className={` bg-green-500 px-1 py-0.5 rounded`}>
            <span className="text-sm">Open</span>
          </div>
        ) : (
          <div className={`bg-gray-300 px-1 py-0.5 rounded`}>
            <span className="text-sm">Closed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feature;
