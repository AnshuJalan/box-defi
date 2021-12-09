import { useEffect, useState } from "react";

import Stage0 from "../assets/images/stages/stage-0.png";
import Stage1 from "../assets/images/stages/stage-1.png";
import Stage2 from "../assets/images/stages/stage-2.png";
import Stage3 from "../assets/images/stages/stage-3.png";
import Stage4 from "../assets/images/stages/stage-4.png";
import Stage5 from "../assets/images/stages/stage-5.png";

// Components
import Button from "../components/Button";

// Temp
const arr = [
  Stage1,
  Stage4,
  Stage3,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
  Stage2,
  Stage0,
  Stage2,
  Stage0,
  Stage5,
  Stage3,
];

// Local constants
const PLANTS_PER_PAGE = 10;

const Farm = () => {
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(3);

  const pageArr = Array.from({ length: Math.ceil(arr.length / PLANTS_PER_PAGE) }, (_, i) => i + 1);

  useEffect(() => {
    if (page < start + 1) {
      setStart(start - 1);
      setEnd(end - 1);
    } else if (page > end) {
      setStart(start + 1);
      setEnd(end + 1);
    }
  }, [page, setStart, setEnd, start, end]);

  return (
    <div className="font-secondary grid grid-cols-12 gap-y-6 md:gap-x-6">
      <div className="rounded-lg bg-white p-6 col-span-12 md:col-span-9">
        <div className="font-primary font-semibold text-fadedBlack text-xl">Planted Boxes</div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5">
          {/* Single Box */}
          {arr.slice((page - 1) * PLANTS_PER_PAGE, page * PLANTS_PER_PAGE).map((a) => (
            <div className="relative w-5/6 cursor-pointer pb-6">
              <div className="absolute left-0 bottom-0 h-full w-full rounded-xl bg-black opacity-0 bg-opacity-0 hover:bg-opacity-80 hover:opacity-100 text-xl font-semibold text-white px-2 py-5 flex flex-col justify-between items-center text-center">
                Water in 23H:45M
                <Button text="Water" background="bg-blue-400" icon="droplet" onClick={() => true} />
              </div>
              <img className="w-full" alt="stage" src={a} />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-12">
          <i onClick={() => setPage(Math.max(1, page - 1))} className="bi bi-caret-left-fill cursor-pointer text-lg" />
          {pageArr.slice(start, end).map((i) => (
            <div
              className={`rounded-lg ${
                page === i ? "bg-black text-white" : "text-fadedBlack"
              } text-lg py-1.5 px-2.5 mx-1`}
            >
              {i}
            </div>
          ))}
          <i
            onClick={() => setPage(Math.min(pageArr.length, page + 1))}
            className="bi bi-caret-right-fill cursor-pointer text-lg"
          />
        </div>
      </div>
      <div className="rounded-lg bg-white p-6 col-span-12 md:col-span-3 h-full"></div>
    </div>
  );
};

export default Farm;
