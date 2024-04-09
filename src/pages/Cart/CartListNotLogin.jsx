import React from 'react';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import { BsHeart, BsFillTrashFill } from 'react-icons/bs';

function CartListNotLogin(props) {
  const {
    cartItem,
    handleRemoveFromCart,
    handleDecreaseItem,
    handleIncreaseItem,
  } = props;
  return (
    <tr
      key={cartItem._id}
      className="cart-body text-center h-[80px] p-2  border-b-[1px] text-[13px]"
    >
      <td align="left">
        <div className="flex flex-col sm:flex-row ">
          <Link to={`/products/${cartItem._id}`}>
            <img
              src={cartItem.image}
              alt={cartItem.name}
              style={{
                width: '70px',
                height: '70px',
                textAlign: 'center',
              }}
              className="flex justify-center"
            />
          </Link>
          <div>
            <p className="title uppercase text-green-900 text-sm font-bold line-clamp-1">
              {cartItem.brand}
            </p>
            <p className="text-xs max-w-[200px] line-clamp-2">
              {cartItem.desc_vn}
            </p>
            <div className="flex gap-3 mt-2">
              <p className="flex gap-1 cursor-pointer hover:text-green-700">
                <BsHeart /> Yêu thích
              </p>
              <p
                className="flex gap-1 cursor-pointer hover:text-green-700"
                onClick={() => handleRemoveFromCart(cartItem)}
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
          value={cartItem.price}
          displayType={'text'}
          thousandSeparator={true}
          suffix=" đ"
        />
      </td>
      <td>
        <div className="flex justify-end items-center">
          <button
            className="h-4 w-4 rounded bg-slate-100"
            onClick={() => handleDecreaseItem(cartItem)}
          >
            -
          </button>
          <p className="mx-2">{cartItem.totalQuantity}</p>
          <button
            className="h-4 w-4 rounded bg-slate-100"
            onClick={() => handleIncreaseItem(cartItem)}
          >
            +
          </button>
        </div>
      </td>
      <td align="right">
        <NumericFormat
          className="text-xs"
          value={cartItem.price * cartItem.totalQuantity}
          displayType={'text'}
          thousandSeparator={true}
          suffix=" đ"
        />
      </td>
    </tr>
  );
}

export default CartListNotLogin;
