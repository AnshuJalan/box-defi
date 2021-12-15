import { useEffect, useState } from "react";

import Watering from "../assets/images/watering.gif";
import Growing from "../assets/images/growing.gif";

// Types
import { BoxStage, Box } from "../redux/actions/farm";

// Operations
import { plantSeeds, waterPlants, harvest } from "../operations/farm";

// Utils
import { seedsPerBox } from "../utils/global";
import { getHHMMString } from "../utils/time";

// Hooks
import { useTypedSelector, useActions } from "../hooks";

// Components
import Button from "../components/Button";

// Local constants
const PLANTS_PER_PAGE = 10;

const Farm = () => {
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(3);

  const { setLoading, setSuccess, setFailure } = useActions();
  const { tokenBalances } = useTypedSelector((state) => state.wallet);
  const { boxes } = useTypedSelector((state) => state.farm);

  const pageArr = Array.from({ length: Math.ceil(boxes.length / PLANTS_PER_PAGE) }, (_, i) => i + 1);

  useEffect(() => {
    if (page < start + 1) {
      setStart(start - 1);
      setEnd(end - 1);
    } else if (page > end) {
      setStart(start + 1);
      setEnd(end + 1);
    }
  }, [page, setStart, setEnd, start, end]);

  const handlePlantSeeds = async () => {
    const maxBoxes = Math.floor(parseInt(tokenBalances.SEED) / seedsPerBox);
    if (maxBoxes === 0) {
      return;
    }

    try {
      const op = await plantSeeds(5);
      if (op) {
        setLoading("Planting seeds");
        await (await op.send()).confirmation(1);
        setSuccess("Planting of seeds succesful!");
      }
    } catch (err: any) {
      setFailure(`Planting Failed: ${err.message}`);
    }
  };

  const handleWaterPlants = async (keys: number[]) => {
    try {
      const op = await waterPlants(keys);
      if (op) {
        setLoading("Watering Plants");
        await (await op.send()).confirmation(1);
        setSuccess("Watering succesful!");
      }
    } catch (err: any) {
      setFailure(`Watering Failed: ${err.message}`);
    }
  };

  const handleHarvest = async (key: number) => {
    try {
      const op = await harvest(key);
      if (op) {
        setLoading("Harvesting Plant");
        await (await op.send()).confirmation(1);
        setSuccess("Harvest succesful!");
      }
    } catch (err: any) {
      setFailure(`Harvest Failed: ${err.message}`);
    }
  };

  // Generate an overlay for the boxes
  const getOverlay = (box: Box) => {
    if (box.stage === BoxStage.DEAD) {
      return (
        <div className="absolute left-0 bottom-0 h-full w-full rounded-xl bg-black bg-opacity-80 font-semibold text-white px-2 py-5 flex flex-col justify-evenly items-center text-center">
          <i className="bi bi-emoji-frown text-6xl" />
          <div className="text-3xl">Dead</div>
        </div>
      );
    } else if (box.stage === BoxStage.STAGE_6) {
      return (
        <div className="absolute left-0 bottom-0 h-full w-full rounded-xl bg-black opacity-0 bg-opacity-0 hover:bg-opacity-80 hover:opacity-100 text-2xl font-semibold text-white px-2 py-5 flex flex-col justify-between items-center text-center">
          Plant Fully grown!
          <Button text="Harvest" background="bg-green-600" icon="flower3" onClick={() => handleHarvest(box.key)} />
        </div>
      );
    } else if (box.needsWater) {
      return (
        <div className="absolute left-0 bottom-0 h-full w-full rounded-xl bg-black opacity-0 bg-opacity-0 hover:bg-opacity-80 hover:opacity-100 text-lg font-semibold text-white px-2 py-5 flex flex-col justify-between items-center text-center">
          Water in {getHHMMString(box.waterBy)}
          <Button text="Water" background="bg-blue-400" icon="droplet" onClick={() => handleWaterPlants([box.key])} />
        </div>
      );
    } else {
      return (
        <div className="absolute left-0 bottom-0 h-full w-full rounded-xl bg-black opacity-0 bg-opacity-0 hover:bg-opacity-80 hover:opacity-100 font-semibold text-white px-2 py-5 flex flex-col justify-evenly items-center text-center">
          <i className="bi bi-emoji-smile text-6xl" />
          <div className="text-2xl">Plant is healthy!</div>
        </div>
      );
    }
  };

  return (
    <div className="font-secondary flex flex-col gap-y-6 xl:w-10/12 m-auto">
      <div className="rounded-lg bg-white p-6">
        <div className="font-primary font-semibold text-fadedBlack text-xl">Planted Boxes</div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-y-2">
          {boxes.slice((page - 1) * PLANTS_PER_PAGE, page * PLANTS_PER_PAGE).map((box, index) => (
            <div key={index} className="relative m-auto w-5/6 cursor-pointer pb-6">
              {getOverlay(box)}
              <img
                className="w-5/6 m-auto"
                alt="stage"
                src={require(`../assets/images/stages/${box.stage.toLowerCase()}.png`).default}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-12">
          <i onClick={() => setPage(Math.max(1, page - 1))} className="bi bi-caret-left-fill cursor-pointer text-lg" />
          {pageArr.slice(start, end).map((i, index) => (
            <div
              key={index}
              onClick={() => setPage(i)}
              className={`rounded-lg cursor-pointer ${
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col justify-between rounded-lg bg-white p-6">
          <div className="font-primary font-semibold text-fadedBlack text-xl">Water All</div>
          <div className="mx-auto">
            <img className="w-16 m-auto my-5" alt="plant_watering" src={Watering} />
            <div className="m-auto">
              <Button
                text="Water All Boxes"
                textColor="text-white"
                background="bg-blue-400"
                icon="droplet"
                onClick={() => handleWaterPlants(boxes.filter((box) => box.needsWater).map((box) => box.key))}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-lg bg-white p-6">
          <div className="font-primary font-semibold text-fadedBlack text-xl">Plant Seeds</div>
          <div className="mx-auto">
            <img className="w-32 mx-auto pb-4" alt="plant_watering" src={Growing} />
            <div className="m-auto">
              <Button
                text="Plant Seeds"
                textColor="text-white"
                background="bg-green-500"
                icon="flower3"
                onClick={handlePlantSeeds}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farm;
