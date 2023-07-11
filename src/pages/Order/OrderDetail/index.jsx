import { NumericFormat } from 'react-number-format';
import { useGetDetailOrderQuery } from '../../../features/OrderApi';

export const OrderDetail = ({ orderId }) => {
  const {
    data: detailOrder,
    isLoading: isLoadingDetailOrder,
    isError: isErrorDetailOrder,
    refetch: refetchDetailOrder,
    isFetching: isFetchingDetailOrder,
  } = useGetDetailOrderQuery(orderId);

  return (
    <div>
      {isLoadingDetailOrder ? (
        <div>Loading...</div>
      ) : isErrorDetailOrder ? (
        <div>Error fetching detail order</div>
      ) : (
        <div className="detail-order-list grid grid-cols-2 xl:grid-cols-3 gap-3 ">
          {detailOrder?.data?.map((detailOrder) => (
            <div key={detailOrder._id} className="">
              <div className="flex gap-2">
                <div>
                  <img
                    src={detailOrder.product[0].image}
                    alt=""
                    className="max-w-[80px]"
                  />
                </div>
                <div className="flex flex-col gap-1 justify-center">
                  <p className="title uppercase text-green-900 text-sm font-bold line-clamp-1">
                    {detailOrder.product[0].brand}
                  </p>
                  <p className="text-[13px] max-w-[320px] line-clamp-2 xl:max-w-[280px]">
                    {detailOrder.product[0].name}
                  </p>
                  <div className="text-[13px]">
                    {detailOrder.quantity} x{' '}
                    <NumericFormat
                      className="new-price text-orange-600 font-bold text-[13px]"
                      value={detailOrder.product[0].price}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=" đ"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
