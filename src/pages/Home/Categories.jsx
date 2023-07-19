import React from 'react';
import { useGetAllCategoryQuery } from '../../features/productsApi';
import { Skeleton, Stack } from '@mui/material';

function Categories() {
  const {
    data: allCategoryData,
    error: allCategoryError,
    isLoading: allCategoryLoading,
  } = useGetAllCategoryQuery();
  return (
    <div>
      {allCategoryLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton
            variant="text"
            sx={{ fontSize: '1rem', width: '50px' }}
            animation="wave"
          />
        </Stack>
      ) : allCategoryError ? (
        <p>An error occured...</p>
      ) : (
        <div className="categories w-full py-2 grid-cols-4 grid-rows-2 grid place-items-center my-3 lg:flex lg:items-center lg:justify-between">
          {allCategoryData.data.map((category, index) => (
            <div
              key={category._id}
              className=" cursor-pointer flex items-center justify-center flex-col"
            >
              <img
                src={category.image_url}
                alt=""
                className="w-[50px] h-[50px]  duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
              />
              <p className="text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
