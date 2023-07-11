import React, { useEffect } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { useCreateOrderMutation } from '../../features/OrderApi';
import { selectEmail } from '../../features/AuthSlice';

export default function ModalOrder({ closeModal, reload, total }) {
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();
  const [createOrder, { data: order, isLoading, isError, isSuccess, error }] =
    useCreateOrderMutation();
  if (isSuccess) {
    closeModal(false);
    reload(true);
    toast.success('Đặt hàng thành công', {
      position: 'top-right',
      autoClose: 2000,
    });
  }
  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const orderOptions = {
    phone: {
      required: 'Không được trống',
      pattern: {
        value: PHONE_REGEX,
        message: 'Số điện thoại không hợp lệ',
      },
    },
    address: {
      required: 'Không được trống',
      minLength: { value: 20, message: 'Địa chỉ tối thiểu 20 ký tự' },
      maxLength: { value: 100, message: 'Địa chỉ tối đa 100 ký tự' },
    },
  };
  const onSubmit = (data) => {
    console.log(data);
    createOrder(data)
      .then((res) => {
        console.log('dat hang thanh cong', res);
      })
      .catch((err) => {
        console.log('dat hang khong thanh cong', err);
      });
  };

  return (
    <div
      class="relative z-[10000000000]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div
                className="absolute right-5 top-5 hover:cursor-pointer"
                onClick={() => closeModal(false)}
              >
                <IoCloseCircleSharp size={30} />
              </div>
              <div class="">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div class="mt-2">
                    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                          Thông tin đơn hàng
                        </h2>
                      </div>

                      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                          class="space-y-6"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div>
                            <label
                              for="email"
                              class="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email
                            </label>
                            <div class="mt-2">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                value={userEmail}
                                readOnly={true}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2 "
                                {...register('email')}
                              />
                            </div>
                          </div>
                          <div>
                            <div>
                              <label
                                for="phone"
                                class="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Số điện thoại
                              </label>
                            </div>
                            <div class="mt-2">
                              <input
                                id="phone"
                                name="phone"
                                type="tel"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                {...register('phone', orderOptions.phone)}
                              />
                              <span className="text-red-500 italic mt-2 text-[10px]">
                                {errors.phone && errors.phone.message}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div>
                              <label
                                for="address"
                                class="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Địa chỉ
                              </label>
                            </div>
                            <div class="mt-2">
                              <input
                                id="address"
                                name="address"
                                type="text"
                                autocomplete="current-phone"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                {...register('address', orderOptions.address)}
                              />
                              <span className="text-red-500 italic mt-2 text-[10px]">
                                {errors.address && errors.address.message}
                              </span>
                            </div>
                          </div>
                          <div>
                            <button
                              type="submit"
                              class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                              {isLoading ? (
                                <CircularProgress size={20} color="inherit" />
                              ) : (
                                'Đặt hàng'
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
