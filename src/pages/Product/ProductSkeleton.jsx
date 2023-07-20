import React from 'react';
import { NumericFormat } from 'react-number-format';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function ProductSkeleton() {
  return (
    <div className="border p-2 leading-relaxed cursor-pointer hover:border-orange-500 w-[242px] h-[300px]">
      <div className="">
        <Skeleton height={100} width={'100%'} />
        <div className="product-price flex justify-between items-center">
          <Skeleton count={1} />
        </div>
        <div className="product-title ">
          <Skeleton count={3} />
        </div>
        <div className="product-footer flex items-center mt-2 gap-2">
          <Skeleton count={1} />
        </div>
      </div>
      <Skeleton highlightColor="#ea580c" width={'100%'} height={40} />
    </div>
  );
}

export default ProductSkeleton;
