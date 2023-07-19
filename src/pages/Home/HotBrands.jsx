import React from 'react';
import Carousel from 'react-multi-carousel';
import { brands } from '../../components/Data';
import 'react-multi-carousel/lib/styles.css';

function HotBrands() {
  const responsive_brand = {
    superLargeDesktop: {
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
    <div className="hot-brands my-3">
      <div className="brand-title flex justify-between p-1 items-center">
        <strong className="uppercase text-green-700 text-lg">
          Thương hiệu nổi bật
        </strong>
        <a href="" className="text-white bg-green-800 text-[13px] p-2 rounded ">
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
  );
}

export default HotBrands;
