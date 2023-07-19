import React, { useEffect } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../../features/AccountApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../features/AuthSlice';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { syncCartWithAPI } from '../../../features/CartSlice';

export default function ModalLogin({ closeModal, switchModal }) {
  const dispatch = useDispatch();
  const [loginUser, { data: user, isLoading, isError, isSuccess, error }] =
    useLoginUserMutation();
  if (isSuccess) {
    dispatch(setCredentials(user));
    dispatch(syncCartWithAPI());
    closeModal(false);
    toast.success('Đăng nhập thành công', {
      autoClose: 2000,
      position: 'top-right',
    });
  }
  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const PWD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const loginOptions = {
    email: {
      required: 'Không được trống',
      pattern: {
        value: EMAIL_REGEX,
        message: 'Email không hợp lệ',
      },
    },
    password: {
      minLength: { value: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
      maxLength: { value: 30, message: 'Mật khẩu tối đa 30 ký tự' },
      required: 'Không được trống',
      pattern: {
        value: PWD_REGEX,
        message: 'Mật khẩu phải bao gồm chữ hoa, chữ thường, ký tự đặt biệt',
      },
    },
  };
  const onSubmit = (data) => {
    loginUser(data)
      .unwrap()
      .then((payload) => console.log('fulfilled', payload))
      .catch((errorss) => console.error('rejected', errorss));
  };

  return (
    <div
      class="relative z-[100000]"
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
                          Đăng nhập với Hasaki.vn
                        </h2>
                      </div>

                      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                          class="space-y-6"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          {isError && (
                            <p className="text-red-500 text-center font-semibold">
                              Sai tài khoản hoặc mật khẩu
                            </p>
                          )}
                          <div>
                            <label
                              for="email"
                              class="flex text-sm font-medium leading-6 text-gray-900"
                            >
                              Email
                            </label>
                            <div class="mt-2">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                class="block w-full rounded-md border border-black sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2 "
                                {...register('email', loginOptions.email)}
                              />
                              <span className="text-red-500 italic mt-2 text-[10px]">
                                {errors?.email && errors?.email.message}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div class="flex items-center justify-between">
                              <label
                                for="password"
                                class="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Mật khẩu
                              </label>
                              <div class="text-sm">
                                <a
                                  href="#"
                                  class="font-semibold text-orange-600 hover:text-orange-500"
                                >
                                  Quên mật khẩu?
                                </a>
                              </div>
                            </div>
                            <div class="mt-2">
                              <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                class="block w-full rounded-md border border-black sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                {...register('password', loginOptions.password)}
                              />
                              <span className="text-red-500 italic mt-2 text-[10px]">
                                {errors.password && errors.password.message}
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
                                'Đăng nhập'
                              )}
                            </button>
                          </div>
                        </form>
                        <p class="mt-10 text-center text-sm text-gray-500 flex justify-center items-center gap-2">
                          Chưa có tài khoản?
                          <p
                            class="font-semibold leading-6 text-orange-600 hover:text-orange-500 cursor-pointer"
                            onClick={() => switchModal()}
                          >
                            {' '}
                            Đăng ký
                          </p>
                        </p>
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
