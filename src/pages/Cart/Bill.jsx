import React from 'react';
import { NumericFormat } from 'react-number-format';

function Bill(props) {
  const { totalPrice, handleShow } = props;
  return (
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
              value={totalPrice}
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
                value={totalPrice}
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
          variant="primary"
          onClick={handleShow}
          className="font-bold bg-orange-500 text-white text-center text-lg w-full p-3 rounded sm:w-[40%] sm:float-right lg:w-full"
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
}

export default Bill;
