import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../../../features/productsApi';
import { NumericFormat } from 'react-number-format';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getTotals } from '../../../features/CartSlice';
export default function DetailProduct() {
  const { productId } = useParams();
  const cart = useSelector((state) => state.cart);
  const { data, isLoading, error } = useGetSingleProductQuery(productId);
  console.log(productId);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleAddCart = () => {
    const product = data.data;
    const updatedProduct = { ...product, totalQuantity: Number(quantity) };
    dispatch(addToCart(updatedProduct));
  };
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <div className="single-product w-full py-3">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="w-full flex min-h-[380px]">
          <div className="w-4/5">
            <div className="product-item flex gap-3">
              <div className="">
                <img src={data.data.image} alt="" />
              </div>
              <div className="product-content p-3">
                <div className="flex gap-2 items-center">
                  <img
                    src="https://hasaki.vn/icon/icon_nowfree.png"
                    alt=""
                    className="h-[15px]"
                  />
                  <p className="text-base text-green-800 font-bold">
                    {data.data.brand}
                  </p>
                </div>
                <p className="font-semibold text-xl text-[19px]">
                  {data.data.name}
                </p>
                <p className="text-[17px]">{data.data.desc_eng}</p>
                <div className="flex text-xs items-center gap-2">
                  <div
                    className="stars"
                    style={{ '--rating': data.data.rating }}
                  ></div>
                  <p>{data.data.rates} người đánh giá</p>
                  <span> | </span>
                  <p>200 hỏi đáp</p>
                  <span> | </span>

                  <p>Mã sản phẩm: {data.data._id}</p>
                </div>
                <div className="flex gap-2  flex-col">
                  <div className="price flex items-center gap-2">
                    <NumericFormat
                      className="new-price  text-orange-600 font-bold text-lg"
                      value={data.data.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=" đ"
                    />
                    <p className="text-[13px] text-[#333333]">
                      (Đã bao gồm VAT)
                    </p>
                  </div>
                  <div className="price-market">
                    <div
                      className={` ${
                        data.data.old_price !== null
                          ? 'flex gap-2 text-[13px] text-[#333333]'
                          : 'hidden'
                      } `}
                    >
                      Giá thị trường
                      <NumericFormat
                        className=""
                        value={data.data.old_price}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix=" đ"
                      />
                      <span> | </span>
                      Tiết kiệm:
                      <NumericFormat
                        className=""
                        value={data.data?.old_price - data.data.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix=" đ"
                      />{' '}
                      <p className="text-orange-600">({data.data.discount})</p>
                    </div>
                  </div>
                  <div className="combo border border-dashed border-orange-500 px-2">
                    <p className="font-bold text-xs text-orange-600">
                      Bill 499k Tặng Xịt Khoáng Làm Dịu Và Bảo Vệ Da 50g trị giá
                      145K (SL có hạn).
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Số lượng: </p>
                    <input
                      className="bg-slate-100 w-20 h-6 p-2"
                      value={quantity}
                      type="number"
                      name=""
                      id=""
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://hasaki.vn/icon/icon_nowfree.png"
                      alt=""
                      className="h-[15px]"
                    />
                    <p className="font-bold text-sm">
                      Giao Nhanh Miễn Phí 2H tại 40 Tỉnh Thành:
                    </p>
                  </div>
                  <p className="text-[13px]">
                    Bạn muốn nhận hàng trước
                    <span className="text-orange-500"> 18h</span> hôm nay
                    <span className="font-bold text-orange-500">
                      (Miễn phí)
                    </span>
                    . Đặt hàng trong
                    <span className="text-orange-500"> 5 phút </span>
                    tới và chọn giao hàng
                    <span className="text-orange-500"> 2h</span> ở bước thanh
                    toán. <span className="text-green-600">Xem chi tiết</span>
                  </p>
                </div>
                <div className="product-action flex gap-3 my-2">
                  <button className="border bg-[#cfeadd] text-[13px] h-[43px] flex items-center p-2 text-green-700 rounded">
                    <p>
                      <FaLocationDot size={20} />
                    </p>
                    <p>
                      112/112 Chi nhánh <br /> còn{' '}
                      <span className="font-semibold">sản phẩm</span>
                    </p>
                  </button>
                  <button
                    className="border text-[13px] h-[43px] flex p-2 items-center gap-2 text-white bg-[#326e52] rounded"
                    onClick={() => handleAddCart(data.data)}
                  >
                    <p>
                      <FaCartPlus size={20} />
                    </p>
                    <strong>Giỏ hàng</strong>
                  </button>
                  <button className="border bg-[#cfeadd] text-[13px] h-[43px] p-2 text-white bg-orange-500 flex flex-col items-center justify-center rounded">
                    <strong className="text-sm">Mua ngay NowFree 2h</strong>
                    <p>Trễ tặng 100k</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/5 bg-[#F2F1F6]">
            <div className="relative p-2">
              <div className="before:content-[''] before:h-[2px] before:bg-[#326e51] before:absolute before:w-[80%] before:top-[50%] before:translate-y-[-50%] before:z-[2] before:left-[50%] before:translate-x-[-50%]"></div>
              <p className="z-10 bg-[#F2F1F6] inline-block text-[13px] text-[#326e51] font-bold w-fit left-[50%] translate-x-[-50%] px-2 relative">
                MIỄN PHÍ VẬN CHUYỂN
              </p>
            </div>
            <div className=" my-2">
              <div className="flex items-center gap-2">
                <img
                  src="https://hasaki.vn/images/graphics/delivery-120-minutes.png"
                  alt=""
                  className="h-[80px]"
                />
                <p className="text-sm">
                  Giao Nhanh Miễn Phí 2H (tại 40 Tỉnh Thành).
                  <span className="font-bold">Trễ tặng 100K</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://hasaki.vn/images/graphics/img_quality_3.png"
                  alt=""
                  className="h-[80px]"
                />
                <p className="text-sm">
                  Hasaki đền bù <span className="font-bold">100K</span>+ hãng
                  đền bù <span className="font-bold">100%</span> nếu phát hiện
                  hàng giả
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://hasaki.vn/images/graphics/img_quality_2.png"
                  alt=""
                  className="h-[80px]"
                />
                <p className="text-sm">
                  <span className="font-bold">Giao Nhanh Miễn Phí </span>
                  (từ 90K tại 40 Tỉnh Thành trừ huyện, toàn Quốc từ 249K)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://hasaki.vn/images/graphics/img_quality_4.png"
                  alt=""
                  className="h-[80px]"
                />
                <p className="text-sm">
                  Đổi trả trong
                  <span className="font-bold"> 14 ngày</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
