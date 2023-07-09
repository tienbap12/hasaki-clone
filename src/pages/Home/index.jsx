'use client';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Banner1 from '../../assets/images/banner1.jpg';
import Banner2 from '../../assets/images/banner2.jpg';
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsCart3,
  BsFillStarFill,
} from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import {
  icon_categories,
  slides,
  items,
  suggestion_categories,
  brands,
} from '../../components/Data';
import {
  useGetAllCategoryQuery,
  useGetAllProductsQuery,
} from '../../features/productsApi';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function Home() {
  const [limit, setLimit] = useState(8);

  const {
    data: allCategoryData,
    error: allCategoryError,
    isLoading: allCategoryLoading,
  } = useGetAllCategoryQuery();
  const {
    data: allProductsData,
    error: allProductsError,
    isLoading: allProductsLoading,
  } = useGetAllProductsQuery();

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
  const responsive_slides = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const responsive_brand = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 3,
    },
  };

  return (
    <div className="container my-1 mx-auto">
      <div className="w-full blog gap-1 xl:flex">
        <div className="slider-left w-full xl:w-2/3 bg-slate-300 h-full relative group">
          <Carousel
            responsive={responsive_slides}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            showDots={true}
            swipeable={true}
          >
            {slides.map((slide, indx) => (
              <div className="slides-banner w-full h-full" key={indx}>
                <img src={slide.url} alt="" className="w-full h-full" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className=" w-full gap-1 hidden xl:flex xl:w-1/3 xl:flex-col">
          <div className="banner-right w-full h-full ">
            <img src={Banner1} alt="" />
          </div>
          <div className="banner-right  h-full">
            <img src={Banner2} alt="" />
          </div>
        </div>
      </div>
      {allCategoryLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '1rem', width: '50px' }}
            animation="wave"
          />
        </Stack>
      ) : allCategoryError ? (
        <p>An error occured...</p>
      ) : (
        <div className="categories w-full py-2 grid-cols-4 grid-rows-2 grid place-items-center my-3 lg:flex lg:items-center lg:justify-between">
          {allCategoryData.data.map((category, index) => (
            <div
              key={category._id}
              className=" cursor-pointer flex items-center justify-center flex-col"
            >
              <img
                src={category.image_url}
                alt=""
                className="w-[50px] h-[50px]  duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
              />
              <p className="text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      )}
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
          <a
            href="/products"
            className="deal-right bg-orange-500 text-white rounded p-1 text-sm h-8"
          >
            Xem tất cả
          </a>
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
              {allProductsData.data
                .slice(0, limit ? limit : allProductsData.data.length)
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

        <div className="suggestion-categories my-2">
          <p className="sc-title uppercase text-green-700 font-bold text-lg">
            Danh mục bạn quan tâm
          </p>
          <div className="grid grid-rows-4 grid-cols-4 gap-2 md:grid-cols-8 md:grid-rows-2">
            {suggestion_categories.map((sc, index) => (
              <div className="relative cursor-pointer border group" key={index}>
                <div className="image transition duration-700 ease-in group-hover:scale-110 ">
                  <img src={sc.url} alt={sc.url} className="object-cover" />
                </div>
                <div className="title absolute bottom-0 left-0 w-full text-center ">
                  <p className="text-[13px] font-bold p-1 opacity-90 flex items-center justify-center bg-white group-hover:text-orange-500 transition duration-500 ease-in">
                    {sc.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hot-brands my-3">
        <div className="brand-title flex justify-between p-1 items-center">
          <strong className="uppercase text-green-700 text-lg">
            Thương hiệu nổi bật
          </strong>
          <a
            href=""
            className="text-white bg-green-800 text-[13px] p-2 rounded "
          >
            Xem tất cả
          </a>
        </div>
        <div className="brand-item py-2 bg-slate-50 mt-1">
          <Carousel
            responsive={responsive_brand}
            autoPlaySpeed={1000}
            swipeable={true}
            slidesToSlide={6}
          >
            {brands.map((brand, index) => (
              <div key={index} className="">
                {' '}
                <div className="min-h-[170px] relative w-[170px] border-transparent border group">
                  <a href="" className="brand-img ">
                    <img
                      src={brand.url}
                      alt=""
                      className="border border-transparent group-hover:border-orange-500"
                    />
                  </a>
                  <div className="brand-logo absolute left-0 bottom-0 px-[10px] drop-shadow-xl ">
                    <img
                      src={brand.img_brand}
                      alt=""
                      className="w-[150px] group-hover:border-orange-500 border border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
