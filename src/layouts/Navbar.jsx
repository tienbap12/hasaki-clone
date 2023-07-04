import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import logoWeb from '../assets/images/logo-new.svg';
import Banner from '../assets/images/16865396251320x50top10708.jpg';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Outlet, Link } from 'react-router-dom';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useSelector } from 'react-redux';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useState } from 'react';
const Navbar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { isShow, setIsShow } = useState(false);
  return (
    <div className="navbar">
      <div className="flex justify-center">
        <img src={Banner} alt="Picture of the author" className="w-[100%]" />
      </div>
      <div className="header w-full font-thin h-full">
        <div className="header-content items-center flex justify-between mx-auto max-w-screen-xl py-3">
          <MenuOutlined
            className="cursor-pointer border border-transparent hover:border-white p-1 rounded m-1"
            style={{ fontSize: '28px' }}
          />
          <Link to="/">
            <img className="cursor-pointer w-[180px] h-[41px]" src={logoWeb} />
          </Link>
          <div className="header-search">
            <div className="search-top text-xs gap-2 flex">
              <a href="">Kem chống nắng</a>
              <a href="">Tẩy trang</a>
              <a href="">toner</a>
              <a href="">Sữa rửa mặt</a>
              <a href="">Tẩy tế bào chết</a>
              <a href="">Retinol</a>
            </div>
            <div className="search-bar flex mt-1 items-center">
              <input
                className="w-full h-8 rounded-l search-input p-1 text-sm"
                type="text"
                placeholder="Tìm sản phẩm, thương hiệu bạn mong muốn..."
              />
              <button className="btn-search w-12 h-8 flex items-center justify-center rounded-r">
                <SearchOutlined />
              </button>
            </div>
          </div>
          <div className="right-header flex gap-3  ">
            <a
              href=""
              className="header-item flex items-center gap-2 text-sm group"
            >
              <a href="" className="icon-header border rounded-full p-2 ">
                <PermIdentityOutlinedIcon fontSize="medium" />
              </a>
              <div className="text-content group-hover:text-orange-500">
                <div className="text-1">
                  <a href="">Đăng nhập </a>
                  <span>/</span>
                  <a href=""> Đăng ký</a>
                </div>
                <div className="text-2">
                  <a href="" className="flex items-center p-1">
                    Tài khoản
                    <span className="icon-breakdown">
                      <RiArrowDownSFill size={20} />
                    </span>
                  </a>
                </div>
              </div>
            </a>
            <Link
              to="/products"
              className="header-item flex items-center gap-2 text-sm group"
            >
              <a href="" className="icon-header border rounded-full p-2">
                <StoreOutlinedIcon fontSize="medium" />
              </a>
              <p className="text-content group-hover:text-orange-500 group-hover:ease-in-out">
                <div className="text-1 break-words w-20 cursor-pointer">
                  Tất cả <br /> sản phẩm
                </div>
              </p>
            </Link>
            <div className="header-item flex items-center gap-2 text-sm group cursor-pointer">
              <a
                href=""
                className="icon-header border rounded-full p-2 cursor-pointer"
              >
                <CallOutlinedIcon fontSize="medium" />
              </a>
              <div className="text-content group-hover:text-orange-500">
                <div className="text-1 w-24 break-words cursor-pointer ">
                  Hỗ trợ <br /> khách hàng
                </div>
              </div>
            </div>
            <div className="header-item flex items-center gap-2 text-sm">
              <Link
                to="/cart"
                className="icon-header border rounded-full p-2 relative"
              >
                <ShoppingCartOutlinedIcon fontSize="medium" className="" />
                {totalQuantity >= 0 && (
                  <span className="absolute item-cart rounded-full min-w-[20px]  max-w-[40px] p-[2px] text-center text-white">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
        <div className="sub-header  bg-green-100 p-1 text-xs ">
          <div className="sub-header_content mx-auto flex max-w-screen-xl items-center justify-between">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
