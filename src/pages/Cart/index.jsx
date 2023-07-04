import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsHeart, BsFillTrashFill } from 'react-icons/bs';
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  increaseCart,
} from '../../features/CartSlice';
import { NumericFormat } from 'react-number-format';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseItem = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseItem = (cartItem) => {
    dispatch(increaseCart(cartItem));
  };

  return (
    <div className="cart min-h-[400px]">
      <div className="cart-title">
        <h1 className="title uppercase font-bold text-xl text-center my-2 text-green-800">
          Giỏ hàng
        </h1>
      </div>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty flex justify-center flex-col items-center gap-3 mt-10 h-full">
          <p>Giỏ hàng đang trống </p>
          <Link
            to="/products"
            className="flex item-center justify-center gap-3 hover:underline hover:text-orange-500 transition ease-in"
          >
            <BsArrowLeft size={20} /> Tiếp tục mua hàng
          </Link>
        </div>
      ) : (
        <div className="cart-items my-3 ">
          <div className="cart-table flex gap-3">
            <div className="w-3/4 ">
              <table className="w-full">
                <tr className="p-1 h-10 bg-[#f7f7f7] text-[13px]">
                  <th>Sản phẩm</th>
                  <th></th>
                  <th align="right">Giá tiền</th>
                  <th align="right">Số lượng</th>
                  <th align="right">Thành tiền</th>
                </tr>
                {cart.cartItems.map((cartItem, index) => (
                  <tr
                    key={cartItem._id}
                    className="cart-body text-center h-[80px] p-2  border-b-[1px] text-[13px]"
                  >
                    <td align="center">
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
                    </td>
                    <td align="left">
                      <p className="title uppercase text-green-900 text-sm font-bold line-clamp-1">
                        {cartItem.brand}
                      </p>
                      <p className="text-xs">{cartItem.desc_vn}</p>
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
                    <td className="flex items-center min-h-[70px] flex- max-h-[70px] justify-end">
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
                ))}
              </table>

              <div>
                <div className="p-[10px] w-1/5 float-right">
                  <div className="mb-[5px] text-[13px] flex flex-col justify-end gap-3 pt-[11px] ">
                    <div className="flex gap-3 justify-end items-center">
                      <p>Tổng cộng:</p>
                      <NumericFormat
                        value={cart.totalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix=" đ"
                        className="text-orange-500 font-bold text-xs"
                      />
                    </div>
                    <div className="mb-[5px] text-[13px] flex justify-end">
                      <p className="text-[#999]">(Đã bao gồm VAT)</p>
                    </div>
                    <button className="font-bold bg-orange-500 text-white text-center text-sm w-full  p-3 rounded">
                      Tiến hành thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="check-out w-1/4">
              <div className="px-3 mx-auto sticky top-0">
                <h2 className="title py-3 p-3 h-10 border-t-[3px] border-t-green-800 flex items-center font-bold border-b-[1px]">
                  Hóa đơn của bạn
                </h2>
                <div className="p-[10px]">
                  <div className="mb-[5px] text-[13px] flex justify-between mt-3">
                    <p>Tạm tính</p>

                    <NumericFormat
                      className="text-xs"
                      value={cart.totalPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=" đ"
                    />
                  </div>
                  <div className="mb-[5px] text-[13px] flex justify-between ">
                    <p>Giảm giá:</p>
                    <p> 0 ₫</p>
                  </div>
                  <div className="mb-[5px] text-[13px] flex justify-between pt-[11px] border-t-[1px] ">
                    <p>Tổng cộng:</p>
                    <p className="text-orange-500 font-bold">
                      <NumericFormat
                        className="text-xs"
                        value={cart.totalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix=" đ"
                      />
                    </p>
                  </div>
                  <div className="mb-[5px] text-[13px] flex justify-between">
                    <p className="text-[#999]">(Đã bao gồm VAT)</p>
                  </div>
                </div>
                <button className="font-bold bg-orange-500 text-white text-center text-lg w-full  p-3 rounded">
                  Tiến hành thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
