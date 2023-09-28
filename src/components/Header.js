import React from "react";
import Search from "./Search";
import icons from "../ultis/icons";
const { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } = icons;
const Header = () => {
  return (
    <div className="flex justify-between items-center w-full  h-full">
      <div className="flex gap-4 items-center w-full ">
        <div className="flex text-gray-400 gap-4">
          <span>
            <HiOutlineArrowLongLeft size={24} />
          </span>
          <span>
            <HiOutlineArrowLongRight size={24} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div>Login</div>
    </div>
  );
};

export default Header;
