import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { sidebarMenu } from "../ultis/Menu";
import path from "../ultis/path";
const notActive =
  "py-2 px-[25px] text-[13px] font-bold text-[#32323D] flex items-center gap-[10px]";
const Active =
  "py-2 px-[25px] text-[13px] font-bold text-[#0F7070] flex items-center gap-[10px]";
const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col bg-main-200">
      <div className="cursor-pointer w-full h-[70px] py-[15px] px-[25px] flex items-center justify-start">
        <img
          onClick={() => navigate(path.home)}
          src={logo}
          alt="logo"
          className="w-[120px] h-10 object-contain"
        />
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => (isActive ? Active : notActive)}
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
