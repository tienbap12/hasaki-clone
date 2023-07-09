import React from 'react';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="container max-w-screen-xl mt-[100px] sm:mx-auto sm:mt-[110px] md:mt-[100px] lg:mt-[150px] xl:mt-[170px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
