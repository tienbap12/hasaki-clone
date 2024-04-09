import React from 'react';
import { useSelector } from 'react-redux';
import { selectStateLogin } from '../../features/AuthSlice';
import UserProfile from './UserProfile';

function Profile() {
      const isLogin = useSelector(selectStateLogin);


  return (
    <div>
      {isLogin ? (
      <UserProfile />
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
