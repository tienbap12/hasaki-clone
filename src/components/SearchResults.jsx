import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchResults({ results, setResults }) {
  const navigate = useNavigate();
  const handleDetailProduct = (item) => {
    navigate(`/products/${item._id}`);
    setResults([]);
  };
  return (
    <div className="bg-white ">
      {results.length > 0 ? (
        <div className="border max-h-[300px] max-w-[400px] overflow-y-scroll absolute z-[1000000] cursor-pointer ">
          {results.map((item) => (
            <div
              className="border flex max-h-[100px] hover:bg-[#ccc]"
              key={item._id}
              onClick={() => handleDetailProduct(item)}
            >
              <img src={item.image} alt="" className="max-w-[50px]" />
              <p className="w-full text-sm bg-white text-black">{item.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
}

export default SearchResults;
