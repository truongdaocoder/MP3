import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Section = () => {
  const { friday } = useSelector((state) => state.app);
  const navigate = useNavigate();
  console.log(friday);
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-5 font-bold">{friday?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>
      <div className="flex items-center justify-between gap-[28px]">
        {friday?.items?.map((item) => (
          <div
            className="flex flex-col gap-2  text-sm w-1/5 flex-auto cursor-pointer"
            key={item?.encodeId}
            onClick={() => {
              const albumLink = item?.link.split(".")[0];
              navigate(albumLink);
            }}
          >
            <img
              src={item?.thumbnail}
              alt="thumbnail"
              className="w-full h-auto rounded-lg"
            />
            <span className="flex flex-col">
              <span>{`${item?.title.slice(0, 20)}...`}</span>
              <span>{`${item?.sortDescription.slice(0, 40)}...`}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Section);
