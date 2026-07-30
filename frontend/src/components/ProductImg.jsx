import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ productImage }) => {
  const [mainImg, setMainImg] = useState(productImage?.[0]?.URL);
  useEffect(() => {
    setMainImg(productImage?.[0]?.URL);
  }, [productImage]);


  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible">
        {productImage?.map((image, index) => (
          <img
            key={index}
            src={image.URL}
            alt={`Product image ${index + 1}`}
            onClick={() => setMainImg(image.URL)}
            className="cursor-pointer w-16 h-16 sm:w-20 sm:h-20 border shadow-md object-cover rounded-md shrink-0"
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 order-1 md:order-2 flex justify-center">
        <Zoom>
          <img
            src={mainImg}
            alt="Product"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] border shadow-lg object-cover rounded-md"
          />
        </Zoom>
      </div>

    </div>
  );
};

export default ProductImg;