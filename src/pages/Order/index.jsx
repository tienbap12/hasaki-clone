import React, { useEffect, useState } from 'react';
import { useGetOrderQuery } from '../../features/OrderApi';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../features/AuthSlice';
import { OrderDetail } from './OrderDetail';

export default function Orders() {
  const email = useSelector(selectEmail);
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Đang Xử Lý':
        return 'text-orange-500';
      case 'đã hủy':
        return 'text-red-500';
      case 'hoàn thành':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };
  const {
    data: orderList,
    isLoading: isLoadingOrderList,
    isError: isErrorOrderList,
    refetch: refetchOrderList,
    isFetching: isFetchingOrderList,
  } = useGetOrderQuery(email);

  return (
    <div className="container mx-auto min-h-screen">
      <div className="title uppercase font-bold text-xl text-center py-2 text-green-800">
        Đơn hàng
      </div>
      <div className="order-list">
        {orderList?.data.map((order) => (
          <div key={order._id} className="flex flex-col py-10 border p-2 gap-4">
            <div className="order-head flex justify-between bg-[#F7F7F7]">
              <div className="flex flex-col gap-3 p-2 ">
                <p className="text-[14px] max-w-[150px] break-words">
                  Mã đơn hàng:{' '}
                  <span className="text-green-600">{order._id}</span>
                </p>
                <p className="text-[14px]">Ngày đặt: {order.order_date}</p>
                <p
                  className={`text-[14px] ${getStatusColorClass(order.status)}`}
                >
                  Trạng thái: {order.status}
                </p>
              </div>
              <div className="flex flex-col gap-3 p-2">
                <p className="text-[14px] font-semibold ">Địa chỉ người nhận</p>
                <p className="text-[14px]  max-w-[150px] md:max-w-[190px]">
                  {order.address}
                </p>
                <p className="text-[14px]">{order.phone_number}</p>
              </div>
              <div className="flex flex-col gap-3 p-2">
                <p className="text-[14px] font-semibold">
                  Phương thức thanh toán
                </p>
                <p className="text-[14px]">Thanh toán sau khi nhận hàng</p>
                <p className="text-[14px]">Thanh toán thành công</p>
                <p className="text-[14px]">Tổng tiền: </p>
              </div>
            </div>
            <OrderDetail orderId={order._id} />
            <div className="flex justify-end gap-4 w-full ">
              <button className="text-[15px] font-bold text-white bg-green-700 p-2 cursor-pointer rounded w-[140px]">
                Mua lại
              </button>
              <button className="text-[15px] font-bold text-white bg-orange-600 p-2 cursor-pointer rounded w-[140px]">
                Đánh giá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
