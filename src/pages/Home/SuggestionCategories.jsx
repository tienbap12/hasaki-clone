import React from 'react';
import { suggestion_categories } from '../../components/Data';

function SuggestionCategories() {
  return (
    <div className="suggestion-categories my-2">
      <p className="sc-title uppercase text-green-700 font-bold text-lg">
        Danh mục bạn quan tâm
      </p>
      <div className="grid grid-rows-4 grid-cols-4 gap-2 md:grid-cols-8 md:grid-rows-2">
        {suggestion_categories.map((sc, index) => (
          <div className="relative cursor-pointer border group" key={index}>
            <div className="image transition duration-700 ease-in group-hover:scale-110 ">
              <img src={sc.url} alt={sc.url} className="object-cover" />
            </div>
            <div className="title absolute bottom-0 left-0 w-full text-center ">
              <p className="text-[13px] font-bold p-1 opacity-90 flex items-center justify-center bg-white group-hover:text-orange-500 transition duration-500 ease-in">
                {sc.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionCategories;
