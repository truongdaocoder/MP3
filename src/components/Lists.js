import { memo } from "react";
import List from "./List";
import icons from "../ultis/icons";
import moment from "moment";
import { useSelector } from "react-redux";
const { BsDot } = icons;
const Lists = ({ totalDuration }) => {
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col text-xs text-gray-600">
      <div className="flex justify-between items-center px-[10px] font-semibold">
        <span>BÀI HÁT</span>
        <span>ALBUM</span>
        <span>THỜI GIAN</span>
      </div>
      <div className="flex flex-col ">
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <span>
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot />
        <span>{moment.utc(totalDuration * 1000).format("mm:ss")}</span>
      </span>
    </div>
  );
};

export default memo(Lists);
