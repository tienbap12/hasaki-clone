import React from 'react';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import { BsHeart, BsFillTrashFill } from 'react-icons/bs';
import { useState } from 'react';
function CartList(props) {
  const {
    id,
    id_product,
    image,
    name,
    brand,
    desc_vn,
    price,
    quantity,
    total,
    increaseQuantity,
    decreaseQuantity,
    deleteCartItem,
  } = props;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const handleIncreaseQuantity = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    increaseQuantity(id, id_product, newQuantity);
    console.log(id, id_product, newQuantity);
  };
  const handleDecreaseQuantity = () => {
    const newQuantity = currentQuantity - 1;
    setCurrentQuantity(newQuantity);
    decreaseQuantity(id, id_product, newQuantity);
  };
  return (
    <>
      <td align="left">
        <div className="flex flex-col sm:flex-row ">
          <Link to={`/products/${id_product}`}>
            <img
              src={image}
              alt={name}
              style={{
                width: '70px',
                height: '70px',
                textAlign: 'center',
              }}
              className="flex justify-center sm:mt-2"
            />
          </Link>
          <div className="p-2">
            <p className="title uppercase text-green-900 text-sm font-bold line-clamp-1">
              {brand}
            </p>
            <p className="text-xs max-w-[200px] line-clamp-2">{desc_vn}</p>
            <div className="flex gap-3 mt-2">
              <p className="flex gap-1 cursor-pointer hover:text-green-700">
                <BsHeart /> Yêu thích
              </p>
              <p
                className="flex gap-1 cursor-pointer hover:text-green-700"
                onClick={deleteCartItem}
              >
                <BsFillTrashFill />
                Xóa
              </p>
            </div>
          </div>
        </div>
      </td>
      <td align="right" className="ml-2">
        <NumericFormat
          className="text-xs"
          value={price}
          displayType={'text'}
          thousandSeparator={true}
          suffix=" đ"
        />
      </td>
      <td>
        <div className="flex justify-end items-center">
          <button
            className="h-4 w-4 rounded bg-slate-100"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
          <p className="mx-2">{currentQuantity}</p>
          <button
            className="h-4 w-4 rounded bg-slate-100"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
        </div>
      </td>
      <td align="right">
        <NumericFormat
          className="text-xs"
          value={total}
          displayType={'text'}
          thousandSeparator={true}
          suffix=" đ"
        />
      </td>
    </>
  );
}

export default CartList;
