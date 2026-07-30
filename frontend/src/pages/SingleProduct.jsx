import ProductDesc from "@/components/ProductDesc";
import ProductImg from "../components/ProductImg";
import Breadcrums from "@/components/Breadcrums";
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleProduct = () => {
  const params = useParams();
  const ProductId = params.id;

  const { products } = useSelector((store) => store.products);
const product = products?.find((item) => item._id === ProductId);

if (!product) {
  return (
    <div className="pt-20 text-center">
      Loading...
    </div>
  );
}

  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto">
      <Breadcrums product={product}/>
      
      <div className="mt-10 grid grid-cols-2 items-start">
        <ProductImg  productImage={product.productImage}/>
        <ProductDesc product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;
