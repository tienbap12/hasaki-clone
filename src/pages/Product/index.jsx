'use client';
import { BsCart3 } from 'react-icons/bs';
import { icon_categories, products } from '../../components/Data';

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useGetAllProductsQuery } from '../../features/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getTotals } from '../../features/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useAddCartMutation, useGetCartQuery } from '../../features/CartApi';
import { selectEmail, selectStateLogin } from '../../features/AuthSlice';
import { toast } from 'react-toastify';

const Product = () => {
  const stateLogin = useSelector(selectStateLogin);
  const userEmail = useSelector(selectEmail);
  const [quantity, setQuantity] = useState(1);
  const [limit, setLimit] = useState(20);
  const cart = useSelector((state) => state.cart);
  const [selectedBrand, setSelectedBrand] = useState('');
  const { data, error, isLoading } = useGetAllProductsQuery();
  const {
    data: cartData,
    isLoading: cartDataLoading,
    isError,
    error: cartDataError,
    isSuccess,
    refetch: cartDataRefetch,
    isFetching,
  } = useGetCartQuery(userEmail, {
    pollingInterval: 300,
  });
  const [dataAddCart] = useAddCartMutation();
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    if (stateLogin === false) {
      dispatch(addToCart({ ...product, totalQuantity: quantity }));
    } else {
      const data = [
        {
          email_user: userEmail,
          product_id: product._id,
          quantity: quantity,
        },
      ];
      console.log(typeof data);
      dataAddCart(data)
        .then((res) => {
          toast.success('Sản phẩm đã được thêm vào giỏ hàng', {
            position: 'top-right',
            autoClose: 2000,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    cartDataRefetch();
    dispatch(getTotals());
  }, [cart, dispatch, cartDataRefetch]);
  const uniqueBrands = Array.from(
    new Set(data?.data?.map((item) => item.brand))
  );
  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };
  const filteredProducts = selectedBrand
    ? data?.data?.filter((product) => product.brand === selectedBrand)
    : data?.data;

  return (
    <div className="product-content bg-slate-50 mt-[100px] sm:mt-[110px] md:mt-[100px] lg:mt-[150px] xl:mt-[170px]">
      <div className="head-content">
        <h1 className="title uppercase font-bold text-xl text-center my-2 text-green-800">
          Tất cả sản phẩm
        </h1>
        {isLoading ? (
          <p>Loading ...</p>
        ) : error ? (
          <p></p>
        ) : (
          <div className="m-3 flex gap-3">
            {uniqueBrands.map((brand) => (
              // <div className="m-3 flex" key={brand}>
              <button
                className="text-black text-[9px] sm:text-sm border-2  hover:border-[#ff235c] rounded p-2 bg-white"
                onClick={() => handleBrandFilter(brand)}
                key={brand}
              >
                {brand}
              </button>
              // </div>
            ))}
          </div>
        )}
      </div>
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Không thể kết nối đến SERVER</p>
      ) : (
        <div className="product-list gap-3 grid grid-cols-2 mx-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-5">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              className=" border p-2 leading-relaxed cursor-pointer hover:border-orange-500"
            >
              <Link to={`/products/${product._id}`}>
                <img src={product.image} alt="" className=" object-cover" />
                <div className="product-price flex justify-between items-center">
                  {/* <NumericFormat  className="new-price text-base text-orange-600">
                    {product.price}
                  </NumericFormat> */}
                  <NumericFormat
                    className="new-price text-base text-orange-600 font-bold text-base"
                    value={product.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix=" đ"
                  />
                  <div className="old-price">
                    <NumericFormat
                      className="old-price_text text-xs line-through"
                      value={product.old_price}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=" đ"
                    />
                    &ensp;
                    <NumericFormat
                      className={`percent-discount text-sm ${
                        product.discount
                          ? 'bg-orange-600 text-white'
                          : 'bg-white'
                      } text-white p-1 rounded`}
                      value={product.discount}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix="%"
                    />
                  </div>
                </div>
                <div className="product-title ">
                  <p className="title uppercase text-green-900 text-sm font-bold line-clamp-1">
                    {product.brand}
                  </p>
                  <p className="sub-title text-xs line-clamp-2 min-h-[32px]">
                    {product.desc_vn}
                  </p>
                </div>
                <div className="product-footer flex items-center mt-2 gap-2">
                  <div className="rating flex gap-1">
                    <div
                      className="stars"
                      style={{ '--rating': product.rating }}
                    ></div>
                    <span className="text-xs">
                      ({product.products_sold || 0})
                    </span>
                  </div>
                  <span>|</span>
                  <div className="product-count_cart flex gap-1">
                    <BsCart3 size={12} />
                    <p className="text-xs">{product.products_sold}</p>
                  </div>
                </div>
              </Link>
              <div className="w-full flex justify-center hover:scale-110 duration-700 transition ease-in">
                <button
                  className="text-white text-sm bg-orange-500 border-none outline-none p-2 rounded flex items-center gap-1 hover:bg-green-700"
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm vào giỏ hàng <BsCart3 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
