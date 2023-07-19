import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useGetAllProductsQuery } from '../features/productsApi';

function SearchBar({ setResults }) {
  const [input, setInput] = useState('');
  const { data, error, isLoading } = useGetAllProductsQuery({
    page: 1,
    size: 40,
  });
  const handleChange = (value) => {
    setInput(value);
    if (value.trim() !== '') {
      // search go Tieng Viet
      // setInput(value);
      // if (value.trim() !== '') {
      //   const filteredResults = data?.data?.filteredProduct.filter((item) =>
      //     item.name.toLowerCase().includes(value.toLowerCase())
      //   );
      //   setResults(filteredResults);

      // search khong can go Tieng Viet
      const removeVietnameseAccent = (str) => {
        const accents =
          'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ';
        const accentsRegex = new RegExp('[' + accents + ']', 'g');
        const replacements =
          'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
        const strWithoutAccents = str.replace(accentsRegex, (match) =>
          replacements.charAt(accents.indexOf(match))
        );
        return strWithoutAccents;
      };
      const filteredResults = data?.data?.filteredProduct.filter((item) =>
        removeVietnameseAccent(item.name.toLowerCase()).includes(
          removeVietnameseAccent(value.toLowerCase())
        )
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <form className="">
      <div className="search-bar flex mt-1 items-center max-w-[400px]">
        <input
          className="w-[150px] h-8 rounded-l search-input p-1 text-sm sm:w-[175px] xl:w-full"
          type="text"
          placeholder="Tìm sản phẩm, thương hiệu bạn mong muốn..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={(e) => handleChange(e.target.value)}
        />
        <button className="btn-search w-12 h-8 flex items-center justify-center rounded-r">
          <SearchOutlined />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
