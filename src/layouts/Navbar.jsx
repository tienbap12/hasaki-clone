import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import logoWeb from '../assets/images/logo-new.svg';
import Banner from '../assets/images/16865396251320x50top10708.jpg';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Link } from 'react-router-dom';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import ModalLogin from '../pages/Account/Login/ModalLogin';
import ModalRegister from '../pages/Account/Register/ModalRegister';
import { logOut, selectStateLogin } from '../features/AuthSlice';
import { toast } from 'react-toastify';
import { useGetCartQuery } from '../features/CartApi';
import SideBar from './SideBar';
const Navbar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { userInfo, email } = useSelector((state) => state.auth);
  const stateLogin = useSelector(selectStateLogin);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);

  const dispatch = useDispatch();
  const {
    data: cartData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    isFetching,
  } = useGetCartQuery(email);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    refetch();
    if (isSuccess) {
      for (let i = 0; i < cartData?.data?.length; i++) {
        console.log(i);
      }
      setTotal(cartData?.data?.length);
    }
  }, [cartData, isSuccess]);
  const handleLoginClick = () => {
    setIsShowLogin(true);
  };
  const handleRegisterClick = () => {
    setIsShowRegister(true);
  };
  const switchModal = () => {
    setIsShowLogin(!isShowLogin);
    setIsShowRegister(!isShowRegister);
  };
  const handleLogOutClick = () => {
    dispatch(logOut());
    // window.location.reload();
    toast.error('Đăng xuất thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="navbar w-full">
      {/* <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
      <div className="flex justify-center">
        <img src={Banner} alt="Picture of the author" className="w-[100%]" />
      </div>
      <div className="header w-full font-thin h-full ">
        <div className="header-content  items-center flex justify-between mx-auto max-w-screen-xl py-3 sm:container xl:max-w-[1280px]">
          <MenuOutlined
            className="cursor-pointer border border-transparent hover:border-white p-1 rounded m-1"
            style={{ fontSize: '28px' }}
          />
          <Link to="/">
            <img
              src="https://hasaki.vn/wap-static/images/icons/logo_hsk_white.svg"
              alt=""
              className="block w-[30px] sm:hidden"
            />
            <img
              className="hidden sm:block lg:block cursor-pointer w-[180px] h-[41px]"
              src={logoWeb}
            />
          </Link>
          <div className="header-search">
            <div className="search-top text-xs gap-2 hidden sm:hidden xl:flex">
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
            <div className="header-item flex items-center gap-2 text-sm group">
              <div className="hidden icon-header border rounded-full p-2 ">
                <PermIdentityOutlinedIcon fontSize="medium" />
              </div>
              {stateLogin ? (
                <div className="text-content ">
                  <div className="text-1 flex gap-1">
                    <p
                      className="hover:text-orange-500 cursor-pointer"
                      onClick={handleLogOutClick}
                    >
                      Xin chào!
                    </p>
                  </div>
                  <div className="dropdown inline-block relative">
                    <button className=" text-orange-600 font-semibold rounded inline-flex items-center group ">
                      <span className="">{userInfo.name}</span>
                      <svg
                        className="fill-current h-4 w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
                      </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden bg-white text-orange-700 pt-2 group-hover:block group-hover:z-[1000000000000]">
                      <li className="">
                        <a
                          href="/profile"
                          className=" rounded-t text-black bg-white hover:bg-gray-400 p-2 block min-w-[150px] text-center"
                        >
                          Thông tin
                        </a>
                      </li>
                      <li className="">
                        <a
                          href="/order"
                          className=" rounded-t text-black bg-white hover:bg-gray-400 p-2 block min-w-[150px]"
                        >
                          Quản lý đơn hàng
                        </a>
                      </li>
                      <li className="">
                        <button
                          className=" rounded-b text-black bg-white hover:bg-gray-400 p-2 min-w-[150px] block"
                          onClick={() => {
                            handleLogOutClick();
                          }}
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-content block">
                  <div className="text-1 flex gap-1">
                    <p
                      className="hover:text-orange-500 cursor-pointer"
                      onClick={handleLoginClick}
                    >
                      Đăng nhập
                    </p>
                    <span>/</span>
                    <div
                      className="hover:text-orange-500 cursor-pointer"
                      onClick={handleRegisterClick}
                    >
                      Đăng ký
                    </div>
                  </div>
                  <div className="text-2">
                    <div className="flex items-center p-1 cursor-pointer">
                      Tài khoản
                      <span className="icon-breakdown">
                        <RiArrowDownSFill size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/products"
              className="header-item hidden sm:hidden lg:flex xl:flex items-center gap-2 text-sm group"
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
            <div className="header-item hidden sm:hidden lg:flex xl:flex items-center gap-2 text-sm group">
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
                {stateLogin ? (
                  total > 0 ? (
                    <span className="absolute item-cart rounded-full min-w-[20px]  max-w-[40px] p-[2px] text-center text-white">
                      {total}
                    </span>
                  ) : (
                    <span className="absolute item-cart rounded-full min-w-[20px]  max-w-[40px] p-[2px] text-center text-white">
                      0
                    </span>
                  )
                ) : totalQuantity > 0 ? (
                  <span className="absolute item-cart rounded-full min-w-[20px]  max-w-[40px] p-[2px] text-center text-white">
                    {totalQuantity}
                  </span>
                ) : (
                  <span className="absolute item-cart rounded-full min-w-[20px]  max-w-[40px] p-[2px] text-center text-white">
                    0
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
        <div className="sub-header hidden lg:block lg:bg-green-100 lg:p-1 lg:text-xs ">
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
        </div>
      </div>
      {isShowLogin && (
        <ModalLogin closeModal={setIsShowLogin} switchModal={switchModal} />
      )}
      {isShowRegister && (
        <ModalRegister
          closeModal={setIsShowRegister}
          switchModal={switchModal}
        />
      )}
    </div>
  );
};

export default Navbar;
