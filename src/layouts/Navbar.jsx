import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import logoWeb from '../assets/images/logo-new.svg';
import Banner from '../assets/images/16865396251320x50top10708.jpg';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Link } from 'react-router-dom';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useDispatch, useSelector } from 'react-redux';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import ModalLogin from '../pages/Account/Login/ModalLogin';
import ModalRegister from '../pages/Account/Register/ModalRegister';
import { logOut, selectStateLogin } from '../features/AuthSlice';
import { toast } from 'react-toastify';
import { useGetCartQuery } from '../features/CartApi';

import SideBar from './SideBar';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SubHeader from './SubHeader';
const Navbar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { userInfo, email } = useSelector((state) => state.auth);
  const stateLogin = useSelector(selectStateLogin);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);
  const [results, setResults] = useState([]);

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
      <div className="flex justify-center">
        <img src={Banner} alt="Picture of the author" className="w-[100%]" />
      </div>
      <div className="header w-full font-thin h-full ">
        <div className="header-content  items-center flex justify-between mx-auto max-w-screen-xl py-3 sm:container xl:max-w-[1280px]">
          <SideBar />
          <Link to="/">
            <img
              src="https://hasaki.vn/wap-static/images/icons/logo_hsk_white.svg"
              alt=""
              className="block w-[30px] sm:w-[40px] md:hidden "
            />
            <img
              className="hidden md:block cursor-pointer w-[180px] h-[41px]"
              src={logoWeb}
            />
          </Link>
          <div className="header-search relative">
            <div className="search-top text-xs gap-2 hidden sm:hidden xl:flex">
              <a href="">Kem chống nắng</a>
              <a href="">Tẩy trang</a>
              <a href="">toner</a>
              <a href="">Sữa rửa mặt</a>
              <a href="">Tẩy tế bào chết</a>
              <a href="">Retinol</a>
            </div>
            <SearchBar setResults={setResults} />
            <SearchResults results={results} setResults={setResults} />
          </div>
          <div className="right-header flex gap-3  ">
            <div className="header-item flex items-center gap-2 text-sm group">
              <div className="icon-header hidden border rounded-full p-2 lg:block">
                <PermIdentityOutlinedIcon fontSize="medium" />
              </div>
              {stateLogin ? (
                <div className="text-content ">
                  <div className="text-1 flex gap-1">
                    <p className="hover:text-orange-500 cursor-pointer"></p>
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
                  <div className="text-1 hidden sm:flex sm:gap-1">
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
                  <div className="text-2" onClick={handleLoginClick}>
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
          <SubHeader />
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
