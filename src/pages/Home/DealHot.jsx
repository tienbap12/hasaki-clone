import React, { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { Skeleton, Stack } from '@mui/material';
import { useGetAllProductsQuery } from '../../features/productsApi';
import SuggestionCategories from './SuggestionCategories';
import 'react-multi-carousel/lib/styles.css';

function DealHot() {
  const [limit, setLimit] = useState(8);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 4,
    },
    smallTablet: {
      breakpoint: { max: 768, min: 576 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 575, min: 0 },
      items: 2,
    },
  };
  const {
    data: allProductsData,
    error: allProductsError,
    isLoading: allProductsLoading,
  } = useGetAllProductsQuery({
    page: 1,
    size: 20,
  });
  return (
    <div className="deal-hot">
      <div className="deal-header w-full flex bg-orange-100 p-2 justify-between items-center">
        <div className="deal-left flex justify-center items-center flex-col sm:flex-row sm:gap-2">
          <div className="flex">
            <img
              src="https://hasaki.vn/images/graphics/flash_deal_title_orange.svg"
              alt=""
              className="h-[25px]"
            />
            <p className="uppercase text-orange-500 font-bold text-lg">
              deals đang diễn ra
            </p>
          </div>
          <span className="hidden sm:block">|</span>
          <div className="flex items-center gap-2">
            <p className="text-xs text-orange-400">Kết thúc trong</p>
            <div className="timer flex gap-1 items-center">
              <div className="hours w-[31px] h-[20px] bg-orange-500 rounded text-white text-xs items-center justify-center flex font-bold">
                01
              </div>
              <span className="text-orange-500 font-bold">:</span>
              <div className="minutes w-[31px] h-[20px] bg-orange-500 rounded text-white text-xs items-center justify-center flex font-bold">
                40
              </div>
              <span className="text-orange-500 font-bold">:</span>
              <div className="second w-[31px] h-[20px] bg-orange-500 rounded text-white text-xs items-center justify-center flex font-bold">
                50
              </div>
            </div>
          </div>
        </div>
        <Link
          to="/products"
          className="deal-right bg-orange-500 text-white rounded p-1 text-sm h-8"
        >
          Xem tất cả
        </Link>
      </div>
      {allProductsLoading ? (
        <Stack
          className=" border p-2 leading-relaxed cursor-pointer hover:border-orange-500"
          height={325}
          width={213}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton
            variant="text"
            // sx={{ fontSize: '1rem', width: '50px' }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            // sx={{ fontSize: '1rem', width: '50px' }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            sx={{ fontSize: '1rem', height: 70 }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            sx={{ fontSize: '1rem', height: 70 }}
            animation="wave"
          />
        </Stack>
      ) : allProductsError ? (
        <p>An error occured...</p>
      ) : (
        <div className="deal-content products">
          <Carousel
            responsive={responsive}
            infinite={true}
            // autoPlay={true}
            autoPlaySpeed={3000}
            // slidesToSlide={2}
          >
            {allProductsData?.data?.filteredProduct
              .slice(
                0,
                limit ? limit : allProductsData?.data?.filteredProduct.length
              )
              .map((item, idprd) => (
                <div
                  key={item._id}
                  className=" border p-2 leading-relaxed cursor-pointer hover:border-orange-500"
                >
                  <Link to={`/products/${item._id}`}>
                    <img src={item.image} alt="" />
                    <div className="product-price flex  justify-between items-center xl:min-h-[28px]">
                      <NumericFormat
                        className="new-price text-sm text-orange-600 font-bold"
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix=" đ"
                      />
                      <div className="old-price flex items-center">
                        <NumericFormat
                          className="old-price_text text-xs line-through"
                          value={item.old_price}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix=" đ"
                        />
                        &ensp;
                        <span
                          className={`percent-discount text-sm ${
                            item.discount
                              ? 'bg-orange-600 text-white'
                              : 'bg-white'
                          } text-white p-1 rounded`}
                        >
                          {item.discount}
                        </span>
                      </div>
                    </div>
                    <div className="product-title ">
                      <p className="title uppercase text-green-900 text-sm font-bold">
                        {item.brand}
                      </p>
                      <p className="sub-title text-xs line-clamp-2 xl:min-h-[32px]">
                        {item.desc_vn}
                      </p>
                    </div>
                    <div className="product-footer flex items-center mt-2 gap-2">
                      <div className="rating flex gap-1">
                        <div
                          className="stars"
                          style={{ '--rating': item.rating }}
                        ></div>
                        <span className="text-xs">({item.rates})</span>
                      </div>
                      <span>|</span>
                      <div className="item-count_cart flex gap-1">
                        <BsCart3 size={12} />
                        <p className="text-xs">{item.products_sold}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </Carousel>
          <div className="sub-deal_banner flex flex-col gap-1 mx-auto sm:flex-row rounded py-2">
            <img
              src="https://media.hasaki.vn/hsk/1686914644unilever_427x140_160623.jpg"
              alt=""
              className=" rounded sm:w-[33.33333%]"
            />
            <img
              src="https://media.hasaki.vn/hsk/1680771027rohto-427x140.jpg"
              alt=""
              className=" rounded sm:w-[33.33333%]"
            />
            <img
              src="https://media.hasaki.vn/hsk/1680771001l'o-427x140.jpg"
              alt=""
              className="rounded sm:w-[33.33333%]"
            />
          </div>
        </div>
      )}
      <SuggestionCategories />
    </div>
  );
}

export default DealHot;
