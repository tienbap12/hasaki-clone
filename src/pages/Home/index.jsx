'use client';
import React from 'react';
import BannerTop from './BannerTop';
import DealHot from './DealHot';
import Categories from './Categories';
import HotBrands from './HotBrands';

export default function Home() {
  return (
    <div className="container my-1 mx-auto">
      <BannerTop />
      <Categories />
      <DealHot />
      <HotBrands />
    </div>
  );
}
