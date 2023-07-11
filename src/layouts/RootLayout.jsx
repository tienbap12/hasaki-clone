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
      <div className="w-full bg-gray-100">
        <div className="container max-w-screen-xl mx-auto bg-white">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
