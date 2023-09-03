import React from "react";
import Feature from "./Feature";
import FeatureDialog from "./FeatureDialog";

const Features = ({ product, getProduct }) => {
  return (
    <div className="flex flex-col m-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Features</span>
        <FeatureDialog productId={product.id} getProduct={getProduct} />
      </div>
      {product.features.map((feature, index) => (
        <Feature key={index} feature={feature} productId={product.id} />
      ))}
    </div>
  );
};

export default Features;
