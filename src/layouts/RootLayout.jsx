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
      <div className="container mx-auto max-w-screen-xl">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
