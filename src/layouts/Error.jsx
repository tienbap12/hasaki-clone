import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="my-4 min-h-screen flex items-center justify-center">
      <div className="">
        <p className="uppercase text-xl py-3 font-bold">
          Đã xảy ra lỗi vui lòng thử lại <br />
        </p>
        <p>
          Quay lại trang chủ &nbsp;
          <Link
            to="/"
            className="underline decoration-1 decoration-black text-red-400"
          >
            Trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Error;
