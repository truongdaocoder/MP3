import React from "react";
import icons from "../ultis/icons";
const { AiOutlineSearch } = icons;
const Search = () => {
  return (
    <div className="w-full flex">
      <span className="h-10 pl-4 bg-[#DDE4E4] text-gray-500 flex items-center rounded-l-[20px] justify-center">
        <AiOutlineSearch size={24} />
      </span>
      <input
        type="text"
        placeholder="Tìm kiếm nghệ sĩ ,lời bài hát..."
        className="outline-none text-gray-500  bg-[#DDE4E4] w-full  px-4 py-2  rounded-r-[20px] h-10"
      />
    </div>
  );
};

export default Search;
