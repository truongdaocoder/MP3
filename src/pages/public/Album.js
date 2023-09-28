import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Lists } from "../../components";
import { useDispatch } from "react-redux";
import * as apis from "../../apis/index";
import * as actions from "../../store/action";
import moment from "moment";
const Album = () => {
  const { pid } = useParams();
  const dispatch = useDispatch();
  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      if (response?.data?.err === 0) {
        setPlaylistData(response.data.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
      }
    };
    fetchDetailPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid]);
  return (
    <div className="flex gap-8 h-screen w-full px-[59px]">
      <div className="flex-none w-1/4 flex flex-col items-center gap-2">
        <img
          className="object-contain w-full rounded-md shadow-md"
          src={playlistData.thumbnailM}
          alt="thumbnail"
        />
        <div className="flex flex-col items-center">
          <h3 className="text-[20px] font-bold text-gray-800">
            {playlistData.title}
          </h3>
          <span className="flex gap-2 items-center text-gray-500 text-xs">
            <span>Cập nhật:</span>
            <span>
              {moment.unix(playlistData.contentLastUpdate).format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex gap-2 items-center text-gray-500  text-xs">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs">{`${Math.round(
            playlistData?.like / 1000
          )}k người yêu thích`}</span>
        </div>
      </div>
      <div className="flex-auto h-screen overflow-y-auto">
        <span className="text-sm">
          <span className="text-gray-600">Lời tựa </span>
          <span>{playlistData?.sortDescription}</span>
        </span>
        <Lists totalDuration={playlistData?.song?.totalDuration} />
      </div>
    </div>
  );
};

export default Album;
