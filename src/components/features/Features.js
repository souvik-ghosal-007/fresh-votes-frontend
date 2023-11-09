import React from "react";
import Feature from "../features/Feature";
import FeatureDialog from "../features/FeatureDialog";

const Features = ({ product, getProduct, authorised }) => {
  return (
    <div className="flex flex-col m-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Features</span>
        {authorised && (
          <FeatureDialog productId={product.id} getProduct={getProduct} />
        )}
      </div>
      {product.features.map((feature, index) => (
        <Feature key={index} feature={feature} productId={product.id} authorised={authorised}/>
      ))}
    </div>
  );
};

export default Features;
