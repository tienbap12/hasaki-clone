import React from 'react';
import Banner1 from '../../assets/images/banner1.jpg';
import Banner2 from '../../assets/images/banner2.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { slides } from '../../components/Data';

function BannerTop() {
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
  return (
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
  );
}

export default BannerTop;
