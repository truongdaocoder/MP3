import icons from "./icons";
const { MdOutlineLibraryMusic, LiaChartPieSolid, TbChartArcs, MdOutlineFeed } =
  icons;
export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icons: <MdOutlineLibraryMusic size={24} />,
  },
  {
    path: "",
    text: "Khám phá",
    icons: <TbChartArcs size={24} />,
  },
  {
    path: "zingchart",
    text: "Zingchart",
    icons: <LiaChartPieSolid size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icons: <MdOutlineFeed size={24} />,
  },
];
