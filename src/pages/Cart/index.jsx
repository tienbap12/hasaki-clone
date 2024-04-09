import React, { useEffect, useState } from 'react';
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
import { selectEmail, selectStateLogin } from '../../features/AuthSlice';
import {
  useDeleteItemMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from '../../features/CartApi';
import { toast } from 'react-toastify';
import ModalOrder from '../Order/ModalOrder';
import ModalConfirm from './Modal';
import CartList from './CartList';
import Bill from './Bill';
import CartListNotLogin from './CartListNotLogin';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const stateLogin = useSelector(selectStateLogin);
  const userEmail = useSelector(selectEmail);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [isShowOrder, setIsShowOrder] = useState(false);
  const [isRefetchCart, setIsRefetchCart] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: cartData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    isFetching,
  } = useGetCartQuery(userEmail);
  if (isRefetchCart) {
    refetch();
    setIsRefetchCart(false);
  }
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteItemMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
    if (isSuccess) {
      refetch();
      let total = 0;
      for (let i = 0; i < cartData?.data?.length; i++) {
        let element =
          cartData?.data[i].data[0].price * cartData?.data[i].quantity;
        total += element;
      }

      setPrice(total);
      setTotal(cartData?.data?.length);
    }
  }, [isSuccess, cartData]);

  const handleShowOrderForm = () => {
    setIsShowOrder(true);
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseItem = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseItem = (cartItem) => {
    dispatch(increaseCart(cartItem));
  };

  const handleUpdateDecreaseCartApi = (_id, product_id, quantity) => {
    const data = {
      _id,
      product_id,
      quantity,
    };
    if (quantity >= 1) {
      setTimeout(() => {
        updateCart(data)
          .then((response) => {
            toast.info('Số lượng đã giảm đi 1', {
              position: 'top-right',
              autoClose: 2000,
            });
            refetch();
          })
          .catch((error) => {
            toast.info('Cập nhật số lượng thất bại', {
              position: 'top-right',
              autoClose: 2000,
            });
          });
      }, 1300);
    } else {
      setTimeout(() => {
        const dataDelete = _id;
        deleteCart(dataDelete)
          .then((response) => {
            toast.error('Đã xóa sản phẩm khỏi giỏ hàng', {
              position: 'top-right',
              autoClose: 2000,
            });
            refetch();
          })
          .catch((error) => {
            // Xử lý lỗi
          });
      }, 1000);
    }
  };
  const handleUpdateIncreaseCartApi = (id, id_product, quantity) => {
    setTimeout(() => {
      const data = {
        _id: id,
        product_id: id_product,
        quantity,
      };
      updateCart(data)
        .then((response) => {
          toast.info('Số lượng đã tăng lên 1', {
            position: 'top-right',
            autoClose: 2000,
          });
          refetch();
        })
        .catch((error) => {
          // Xử lý lỗi
        });
    }, 2000);
  };
  const handleDeleteItemApi = (cartItem) => {
    setTimeout(() => {
      const data = {
        email_user: cartItem?.email_user,
        product_id: cartItem?.product_id,
      };
      deleteCart(data)
        .then((response) => {
          toast.error('Đã xóa sản phẩm khỏi giỏ hàng', {
            position: 'top-right',
            autoClose: 2000,
          });
          refetch();
          //
        })
        .catch((error) => {});
    }, 2000);
  };

  return (
    <div className="cart min-h-[400px] ">
      <div className="cart-title">
        <h1 className="title uppercase font-bold text-xl text-center py-2 text-green-800">
          Giỏ hàng
        </h1>
      </div>
      {stateLogin === true ? (
        cartData?.data?.length === 0 ? (
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
            <div className="cart-table flex flex-col gap-3 lg:flex-row">
              <div className="w-full p-3 lg:w-3/4">
                <table className="w-full">
                  <tr className="p-1 h-10 bg-[#f7f7f7] text-[13px]">
                    <th align="left">Sản phẩm</th>
                    <th align="right">Giá tiền</th>
                    <th align="right">Số lượng</th>
                    <th align="right">Thành tiền</th>
                  </tr>
                  {cartData?.data?.map((cartItem, index) => (
                    <tr
                      key={cartItem._id}
                      className="cart-body text-center h-[80px] p-2  border-b-[1px] text-[13px]"
                    >
                      <CartList
                        id={cartItem._id}
                        id_product={cartItem?.data[0]._id}
                        image={cartItem?.data[0].image}
                        name={cartItem?.data[0].name}
                        brand={cartItem?.data[0].brand}
                        desc_vn={cartItem?.data[0].desc_vn}
                        price={cartItem?.data[0].price}
                        quantity={cartItem?.quantity}
                        total={cartItem?.data[0].price * cartItem?.quantity}
                        increaseQuantity={(id, id_product, quantity) =>
                          handleUpdateIncreaseCartApi(id, id_product, quantity)
                        }
                        decreaseQuantity={(id, id_product, quantity) =>
                          handleUpdateDecreaseCartApi(id, id_product, quantity)
                        }
                        deleteCartItem={handleDeleteItemApi}
                      />
                    </tr>
                  ))}
                </table>
              </div>
              <div className="check-out lg:block lg:w-1/4">
                <div className="px-3 mx-auto sticky top-0 mt-[10px]">
                  <h2 className="title py-3 p-3 h-10 border-t-[3px] border-t-green-800 flex items-center font-bold border-b-[1px]">
                    Hóa đơn của bạn
                  </h2>
                  <div className="p-[10px]">
                    <div className="mb-[5px] text-[13px] flex justify-between mt-3">
                      <p>Tạm tính</p>
                      <NumericFormat
                        className="text-xs"
                        value={price}
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
                          value={price}
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
                  <button
                    className="font-bold bg-orange-500 text-white text-center text-lg w-full p-3 rounded sm:w-[40%] sm:float-right lg:w-full"
                    onClick={handleShowOrderForm}
                  >
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : cart.cartItems.length === 0 ? (
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
          <div className="cart-table flex flex-col gap-3 lg:flex-row">
            <div className="w-full p-3 lg:w-3/4">
              <table className="w-full">
                <tr className="p-1 h-10 bg-[#f7f7f7] text-[13px]">
                  <th align="left">Sản phẩm</th>
                  <th align="right">Giá tiền</th>
                  <th align="right">Số lượng</th>
                  <th align="right">Thành tiền</th>
                </tr>
                {cart.cartItems.map((cartItem, index) => (
                  <CartListNotLogin
                    key={cartItem._id}
                    cartItem={cartItem}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleDecreaseItem={handleDecreaseItem}
                    handleIncreaseItem={handleIncreaseItem}
                  />
                ))}
              </table>
            </div>
            <Bill totalPrice={cart.totalPrice} handleShow={handleShow} />
          </div>
        </div>
      )}
      {show && <ModalConfirm closeModal={setShow} />}
      {isShowOrder && (
        <ModalOrder
          closeModal={setIsShowOrder}
          reload={setIsRefetchCart}
          total={price}
        />
      )}
    </div>
  );
}
