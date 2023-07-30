'use client';
import { BsCart3 } from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGetAllProductsQuery } from '../../features/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getTotals } from '../../features/CartSlice';
import { useAddCartMutation, useGetCartQuery } from '../../features/CartApi';
import { selectEmail, selectStateLogin } from '../../features/AuthSlice';
import { toast } from 'react-toastify';
import ProductItem from './ProductItem';
import ProductSkeleton from './ProductSkeleton';
import Skeleton from 'react-loading-skeleton';
import { Pagination } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
const Product = () => {
  const stateLogin = useSelector(selectStateLogin);
  const userEmail = useSelector(selectEmail);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [availableBrands, setAvailableBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, error, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    size: pageSize,
  });
  console.log('data', data?.message);
  const totalProducts = data?.data?.totalProducts;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const useStyles = makeStyles(() => ({
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#15803d',
      },
    },
  }));
  const classes = useStyles();
  const { refetch: cartDataRefetch } = useGetCartQuery(userEmail);
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
          cartDataRefetch();
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
    new Set(data?.data?.filteredProduct.map((item) => item.brand))
  );
  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
    setAvailableBrands(
      data?.data?.filteredProduct
        .filter((product) => product.brand === brand)
        .map((product) => product.brand)
    );
  };
  const filteredProducts = selectedBrand
    ? data?.data?.filteredProduct.filter(
        (product) => product.brand === selectedBrand
      )
    : data?.data?.filteredProduct;

  return (
    <div className="product-content bg-slate-50 ">
      <div className="head-content">
        <h1 className="title uppercase font-bold text-xl text-center py-2 text-green-800">
          Tất cả sản phẩm
        </h1>
        {isLoading ? (
          <div className="px-2">
            <Skeleton width={'100%'} height={40} />
          </div>
        ) : error ? (
          <p></p>
        ) : (
          <div className="m-3 flex gap-3">
            {uniqueBrands.map((brand) => (
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
        <div className="p-2">
          <ProductSkeleton />
        </div>
      ) : error ? (
        <p>Không thể kết nối đến SERVER</p>
      ) : (
        <div className="product-list gap-3 grid grid-cols-2 mx-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-5">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              className="border p-2 leading-relaxed cursor-pointer hover:border-orange-500"
            >
              <ProductItem
                id={product._id}
                img={product.image}
                price={product.price}
                oldPrice={product.old_price}
                discount={product.discount}
                brand={product.brand}
                desc_vn={product.desc_vn}
                rating={product.rating}
                productSold={product.products_sold}
              />
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
      <div className="flex justify-center items-center gap-2 h-full py-2">
        <Pagination
          classes={{ ul: classes.ul }}
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          style={{ marginBottom: '1rem', color: 'green' }}
        />
      </div>
    </div>
  );
};

export default Product;
