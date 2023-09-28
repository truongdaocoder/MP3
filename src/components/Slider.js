import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as action from "../store/action/index";
const Slider = () => {
  const { banner } = useSelector((state) => state.app);
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(action.setCurSongId(item.encodeId));
      dispatch(action.play(true));
      dispatch(action.setPlaylist(null));
    } else if (item?.type === 4) {
      const albumLink = item?.link.split(".")[0];
      navigate(albumLink);
    } else {
      dispatch(action.setPlaylist(null));
    }
  };
  return (
    <div className="w-full overflow-hidden px-[59px]">
      <div className="flex gap-4  pt-8">
        {banner.map((item, index) => (
          <img
            className={`slider flex-1 object-contain w-[30%] rounded-lg ${
              index <= 2 ? "block" : "hidden"
            }`}
            onClick={() => handleClickBanner(item)}
            key={index}
            src={item.banner}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
