import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

function ProductItem(props) {
  return (
    <Link to={`/products/${props.id}`}>
      <img src={props.img} alt="" className=" object-cover" />
      <div className="product-price flex justify-between items-center">
        <NumericFormat
          className="new-price text-base text-orange-600 font-bold text-base"
          value={props.price}
          displayType={'text'}
          thousandSeparator={true}
          suffix=" đ"
        />
        <div className="old-price">
          <NumericFormat
            className="old-price_text text-xs line-through"
            value={props.old_price}
            displayType={'text'}
            thousandSeparator={true}
            suffix=" đ"
          />
          &ensp;
          <NumericFormat
            className={`percent-discount text-sm ${
              props.discount ? 'bg-orange-600 text-white' : 'bg-white'
            } text-white p-1 rounded`}
            value={props.discount}
            displayType={'text'}
            thousandSeparator={true}
            suffix="%"
          />
        </div>
      </div>
      <div className="product-title ">
        <p className="title uppercase text-green-900 text-sm font-bold line-clamp-1">
          {props.brand}
        </p>
        <p className="sub-title text-xs line-clamp-2 min-h-[32px]">
          {props.desc_vn}
        </p>
      </div>
      <div className="product-footer flex items-center mt-2 gap-2">
        <div className="rating flex gap-1">
          <div className="stars" style={{ '--rating': props.rating }}></div>
          <span className="text-xs">({props.productSold || 0})</span>
        </div>
        <span>|</span>
        <div className="product-count_cart flex gap-1">
          <BsCart3 size={12} />
          <p className="text-xs">{props.productSold}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
