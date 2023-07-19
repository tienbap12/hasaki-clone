import React from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '../../../features/AccountApi';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import '../../../App.scss';

export default function ModalRegister({ closeModal, switchModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 2010 - 1970 }, (_, index) => 2009 - index);
  const PWD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const registerOptions = {
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
    fullName: {
      required: 'Không được trống',
      minLength: { value: 6, message: 'Họ và tên tối thiểu 6 ký tự' },
      maxLength: { value: 50, message: 'Họ và tên tối đa 50 ký tự' },
    },
    gender: {
      required: 'Vui lòng chọn giới tính',
    },
    day: {
      required: 'Vui lòng chọn ngày',
    },
    month: {
      required: 'Vui lòng chọn tháng',
    },
    year: {
      required: 'Vui lòng chọn năm',
    },
  };

  const [
    registerUser,
    { data: dataRegister, isError, isLoading, isSuccess, error },
  ] = useRegisterUserMutation();
  const onSubmit = (data) => {
    console.log(data);
    registerUser(data)
      .unwrap()
      .then((originalPromiseResult) => {
        console.log('tra ve dung', originalPromiseResult);
        switchModal();
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log('loi o day', rejectedValueOrSerializedError);
      });
  };

  return (
    <div
      class="relative z-[1001]"
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
                          Đăng ký tài khoản với Hasaki.vn
                        </h2>
                      </div>
                      {isSuccess && (
                        <p className="text-green-600 font-semibold text-center">
                          Đăng ký tài khoản thành công!
                        </p>
                      )}
                      {isError && (
                        <p className="text-red-500 text-center">
                          {JSON.stringify(error.error)}
                        </p>
                      )}
                      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                          class="space-y-6"
                          onSubmit={handleSubmit(onSubmit)}
                          method="POST"
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
                                type="text"
                                autocomplete="email"
                                {...register('email', registerOptions.email)}
                                className="block w-full rounded-md border border-black sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                              />
                              <span className="text-red-500 italic mt-2 text-[10px]">
                                {errors?.email && errors?.email.message}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="gender"
                              class="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Giới tính
                            </label>
                            <div class="mt-2 ">
                              <select
                                {...register('gender', registerOptions.gender)}
                                name="gender"
                                id="gender"
                                className={`w-full border border-black sm:border-gray-300  p-2 rounded sm:w-[200px] ${
                                  errors?.gender ? 'border-red-500' : ''
                                }`}
                              >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam" className="">
                                  Nam
                                </option>
                                <option value="Nữ">Nữ</option>
                              </select>
                            </div>
                            <span className="text-red-500 italic mt-2 text-[10px]">
                              {errors?.gender && errors?.gender.message}
                            </span>
                          </div>
                          <div>
                            <div class="">
                              <label
                                for="password"
                                class="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Mật khẩu
                              </label>
                            </div>
                            <div class="mt-2">
                              <input
                                {...register(
                                  'password',
                                  registerOptions.password
                                )}
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                required
                                className="block w-full rounded-md border border-black sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                              />
                              <span className="text-red-500 italic mt-2 text-[10px]">
                                {errors?.password && errors?.password.message}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="fullName"
                              class="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Họ Tên
                            </label>
                            <div class="mt-2">
                              <input
                                {...register(
                                  'fullName',
                                  registerOptions.fullName
                                )}
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                class="block w-full rounded-md border border-black sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:l-6 px-2"
                              />
                              <span className="text-red-500 italic mt-2 text-[10px]">
                                {errors?.fullName && errors?.fullName.message}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="dateOfBirth"
                              class="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Ngày sinh
                            </label>
                            <div class="mt-2">
                              <div className="px-auto flex justify-center gap-4 sm:justify-start ">
                                <select
                                  {...register('day', registerOptions.day)}
                                  className={` border border-black sm:border-gray-300 p-2 rounded ${
                                    errors?.day ? 'border-red-500' : ''
                                  }`}
                                >
                                  <option value="">Ngày</option>
                                  {days.map((day) => (
                                    <option key={day} value={day}>
                                      {day}
                                    </option>
                                  ))}
                                </select>
                                <select
                                  {...register('month', registerOptions.month)}
                                  className={`border border-black sm:border-gray-300  p-2 rounded ${
                                    errors?.month ? 'border-red-500' : ''
                                  }`}
                                >
                                  <option value="">Tháng</option>
                                  {months.map((month) => (
                                    <option key={month} value={month}>
                                      {month}
                                    </option>
                                  ))}
                                </select>
                                <select
                                  {...register('year', registerOptions.year)}
                                  className={`border border-black sm:border-gray-300 p-2 rounded ${
                                    errors?.year ? 'border-red-500' : ''
                                  }`}
                                >
                                  <option value="">Năm</option>
                                  {years.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex justify-center gap-2 sm:justify-start">
                                <span
                                  className=" text-red-500 italic mt-2
                                text-[10px]"
                                >
                                  {errors?.day && errors?.day.message}
                                </span>
                                <span
                                  className=" text-red-500 italic mt-2
                                text-[10px]"
                                >
                                  {errors?.month && errors?.month.message}
                                </span>
                                <span
                                  className=" text-red-500 italic mt-2
                                text-[10px]"
                                >
                                  {errors?.year && errors?.year.message}
                                </span>
                              </div>
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
                                'Đăng ký'
                              )}
                            </button>
                          </div>
                        </form>
                        <p class="mt-10 text-center text-sm text-gray-500 flex justify-center items-center gap-2">
                          Đã có tài khoản?
                          <p
                            class="font-semibold leading-6 text-orange-600 hover:text-orange-500 cursor-pointer"
                            onClick={() => switchModal()}
                          >
                            Đăng nhập
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
