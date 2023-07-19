import React from 'react';
import { useSelector } from 'react-redux';
import { selectStateLogin } from '../../features/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const isLogin = useSelector(selectStateLogin);
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div>
      {isLogin ? (
        <div className="container mx-auto min-h-screen">
          <div className="title uppercase font-bold text-xl text-center my-2 text-green-800">
            Thông tin cá nhân
          </div>
          <div className="max-w-md p-8 sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100">
            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
              <img
                src="https://source.unsplash.com/100x100/?portrait?1"
                alt=""
                className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
                <span>{userInfo.gender}</span>
                <br />
                <span className="text-sm dark:text-gray-400">
                  {userInfo.birthday}
                </span>
              </div>
              <div className="space-y-1">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-label="Email address"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                    ></path>
                  </svg>
                  <span className="dark:text-gray-400">{userInfo.email}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto min-h-screen flex justify-center items-center">
          <p className="uppercase text-xl text-center font-bold">
            Vui lòng đăng nhập
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
