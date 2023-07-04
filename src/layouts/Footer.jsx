import React from 'react';
import { Outlet } from 'react-router-dom';
function Footer() {
  return (
    <div className="footer w-full  bg-[#e5fbf1] ">
      <div className="container flex justify-center items-center max-w-screen-xl mx-auto">
        <div className="left-slogan w-3/5 flex justify-center">
          <div className="slogan-item w-[190px] h-[160px] flex flex-col items-center justify-center">
            <img
              src="https://hasaki.vn/images/graphics/icon_footer_1.svg"
              alt=""
              className="w-[75px] h-[75px]"
            />
            <p className="text-[15px] text-[#326e51] text-center">
              Thanh toán <br /> khi nhận hàng
            </p>
          </div>{' '}
          <div className="slogan-item w-[190px] h-[160px] flex flex-col items-center justify-center">
            <img
              src="https://hasaki.vn/images/graphics/icon_footer_2.svg"
              alt=""
              className="h-[75px]"
            />
            <p className="text-[15px] text-[#326e51] text-center">
              Now free <br /> 2h
            </p>
          </div>{' '}
          <div className="slogan-item w-[190px] h-[160px] flex flex-col items-center justify-center">
            <img
              src="https://hasaki.vn/images/graphics/icon_footer_3.svg"
              alt=""
              className="w-[75px] h-[75px]"
            />
            <p className="text-[15px] text-[#326e51] text-center">
              14 ngày đổi trả <br /> miễn phí
            </p>
          </div>{' '}
          <div className="slogan-item w-[190px] h-[160px] flex flex-col items-center justify-center">
            <img
              src="https://hasaki.vn/images/graphics/icon_footer_4.svg"
              alt=""
              className="w-[75px] h-[75px]"
            />
            <p className="text-[15px] text-[#326e51] text-center">
              Thương hiệu uy tín <br /> toàn cầu
            </p>
          </div>
        </div>
        <div className="hot-line  w-2/5  m-2 flex justify-center">
          <div className="border-2 border-[#326e51] w-[90%] flex  justify-evenly rounded-lg h-[100px]">
            <div className="left-content flex items-center gap-2 leading-6">
              <img
                src="https://hasaki.vn/images/graphics/icons_hotline_kn.svg"
                alt=""
                className="w-[28px] h-[28px]"
              />
              <div className="text">
                <p className="text-[20px] text-[#306e51]">Khiếu nại, góp ý</p>
                <strong className="text-[24px] text-[#326e51]">
                  1800 6310
                </strong>
              </div>
            </div>
            <div className="right-content flex items-center gap-2 leading-6">
              <img
                src="https://hasaki.vn/images/graphics/icons_hotline_tv.svg"
                alt=""
                className="w-[28px] h-[28px]"
              />
              <div className="text">
                <p className="text-[20px] text-[#306e51]">Tư vấn</p>
                <strong className="text-[24px] text-[#326e51]">
                  1800 6324
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
