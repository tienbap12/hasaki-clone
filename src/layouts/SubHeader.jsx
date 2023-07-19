import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
function SubHeader() {
  return (
    <div className="sub-header_content  mx-auto flex max-w-screen-xl items-center justify-between lg:container xl:max-w-[1280px]">
      <div className="sub-header_left  items-center flex gap-3 uppercase">
        <button className="rounded border-btn px-1">
          <LocationOnOutlinedIcon /> Chọn khu vực
        </button>
        <a href="">Hasaki Deals</a>
        <a href="">Hot Deals</a>
        <a href="">Thương hiệu</a>
        <a href="">Hàng mới về</a>
        <a href="">bán chạy</a>
        <a href="">Clinic & Spa</a>
      </div>
      <div className="sub-header_right  items-center flex gap-3 ">
        <button className="rounded border-btn px-1">
          <PhoneAndroidOutlinedIcon /> Tải ứng dụng
        </button>
        <button className="rounded border-btn px-1">
          <Inventory2OutlinedIcon /> Tra cứu đơn hàng
        </button>
      </div>
    </div>
  );
}

export default SubHeader;
