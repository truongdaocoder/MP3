import { Outlet } from "react-router-dom";
import { Header, Player, SidebarLeft, SidebarRight } from "../../components";
import React from "react";
function Public() {
  return (
    <div className="flex flex-col h-screen w-full bg-main-300">
      <div className="w-full h-full flex">
        <div className="w-[240px] h-screen flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto ">
          <div className="h-[70px]  px-[59px] items-center">
            <Header />
          </div>
          <Outlet />
        </div>
        <div className="w-[250px] 1300:hidden flex-none border border-green-600">
          <SidebarRight />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 border border-blue-400 h-[90px]">
        <Player />
      </div>
    </div>
  );
}

export default Public;
