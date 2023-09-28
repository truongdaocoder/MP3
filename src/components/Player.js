import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as apis from "../apis/index";
import icons from "../ultis/icons";
import * as acitons from "../store/action";
import moment from "moment";
const {
  AiFillHeart,
  //  AiOutlineHeart,
  BiDotsHorizontalRounded,
  MdSkipNext,
  MdSkipPrevious,
  CiShuffle,
  BsPauseFill,
  BsPlayFill,
  CiRepeat,
} = icons;
const Player = () => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  const [curSeconds, setCurSeconds] = useState(0);
  const dispatch = useDispatch();
  const thumb = useRef();
  const trackRef = useRef();
  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1?.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2?.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        toast.warn(res2?.data.msg);
        dispatch(acitons.play(false));
        setCurSeconds(0);
        setAudio(new Audio());
        thumb.current.style.cssText = `right:100%`;
      }
    };
    fetchDetailSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSongId]);
  useEffect(() => {
    audio.load();
  }, [audio]);
  useEffect(() => {
    const handleUpdate = () => {
      let percent =
        Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
      thumb.current.style.cssText = `right:${100 - percent}%`;
      setCurSeconds(Math.round(audio.currentTime));
    };
    if (isPlaying) {
      audio.play();
      audio.addEventListener("timeupdate", handleUpdate);
    }
    return () => {
      audio.removeEventListener("timeupdate", handleUpdate);
      console.log("xong");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio, isPlaying]);
  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      dispatch(acitons.play(false));
      audio.pause();
    } else {
      dispatch(acitons.play(true));
      audio.play();
    }
  };
  const handleProgressBar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent = Math.round(
      ((e.clientX - trackRect.left) * 100) / trackRect.width
    );
    thumb.current.style.cssText = `right:${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurSeconds(audio.currentTime);
  };
  const handleNextSong = () => {
    if (songs) {
      // eslint-disable-next-line no-unused-vars
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(acitons.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(acitons.play(true));
    }
  };
  const handlePrevSong = () => {
    if (songs) {
      // eslint-disable-next-line no-unused-vars
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(acitons.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(acitons.play(true));
    }
  };
  const handleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };
  return (
    <div className="bg-main-400 h-full flex px-5 ">
      <div className="w-[30%] gap-3 flex-none flex items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-[14px]">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500 ">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span>
            <AiFillHeart size={16} />
          </span>
          <span>
            <BiDotsHorizontalRounded />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-none gap-2 py-2 items-center flex flex-col">
        <div className="flex gap-8 justify-center items-center">
          <span
            onClick={handleShuffle}
            className={`${isShuffle ? "text-violet-500" : ""} cursor-pointer`}
            title="Bật phát ngẫu nhiên"
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={songs ? "cursor-pointer" : "text-gray-500"}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 cursor-pointer border hover:text-[#0E8080] border-gray-700 rounded-full"
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
          </span>
          <span
            onClick={handleNextSong}
            className={songs ? "cursor-pointer" : "text-gray-500"}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            onClick={() => setIsRepeat((prev) => !prev)}
            className={`${isRepeat ? "text-violet-500" : ""} cursor-pointer`}
          >
            <CiRepeat size={24} />
          </span>
        </div>
        <div className="w-full flex items-center justify-center text-xs gap-2">
          <span> {moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div
            onClick={handleProgressBar}
            ref={trackRef}
            className="h-[3px] hover:h-[8px] cursor-pointer bg-[rgba(0,0,0,0.1)] w-3/5 relative rounded-r-full rounded-l-full"
          >
            <div
              ref={thumb}
              className="absolute rounded-r-full rounded-l-full top-0 left-0 bottom-0 bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] flex-none">volime</div>
    </div>
  );
};

export default Player;
