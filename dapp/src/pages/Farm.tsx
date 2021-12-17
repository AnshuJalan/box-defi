import { useEffect, useState } from "react";

import Watering from "../assets/images/watering.gif";
import Growing from "../assets/images/growing.gif";

// Types
import { BoxStage, Box } from "../redux/actions/farm";

// Operations
import { plantSeeds, waterPlants, harvest } from "../operations/farm";

// Utils
import { seedsPerBox, waterPeriod } from "../utils/global";
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
  const [filterOption, setFilterOption] = useState<number>(1);
  const [filteredBoxes, setFilteredBoxes] = useState<Box[]>([]);

  const { setLoading, setSuccess, setFailure } = useActions();
  const { tokenBalances } = useTypedSelector((state) => state.wallet);
  const { boxes } = useTypedSelector((state) => state.farm);

  // TODO: memoize
  const pageArr = Array.from({ length: Math.ceil(filteredBoxes.length / PLANTS_PER_PAGE) }, (_, i) => i + 1);
  const numNeedsWater = boxes.filter((box) => box.needsWater && box.stage !== BoxStage.STAGE_6).length;
  const maxBoxes = Math.floor(parseInt(tokenBalances.SEED) / seedsPerBox);

  useEffect(() => {
    if (page < start + 1) {
      setStart(start - 1);
      setEnd(end - 1);
    } else if (page > end) {
      setStart(start + 1);
      setEnd(end + 1);
    }
  }, [page, setStart, setEnd, start, end]);

  useEffect(() => {
    setPage(1); // Safe-hatch for decrease in items
    switch (filterOption) {
      case 0: {
        // All
        setFilteredBoxes(boxes);
        break;
      }
      case 1: {
        // Alive
        setFilteredBoxes(boxes.filter((box) => box.stage !== BoxStage.DEAD));
        break;
      }
      case 2: {
        // Needs water
        setFilteredBoxes(boxes.filter((box) => box.needsWater && box.stage !== BoxStage.STAGE_6));
        break;
      }
      case 3: {
        // Harvestable
        setFilteredBoxes(boxes.filter((box) => box.stage === BoxStage.STAGE_6));
        break;
      }
    }
  }, [filterOption, boxes]);

  const handlePlantSeeds = async () => {
    try {
      const op = await plantSeeds(maxBoxes);
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
    <div className="font-secondary flex flex-col gap-y-6 2xl:w-10/12 m-auto">
      <div className="rounded-lg bg-white p-6">
        <div className="flex justify-between items-center">
          <div className="font-primary font-semibold text-fadedBlack text-xl">Plant Boxes</div>
          <div
            onClick={() => setFilterOption((filterOption + 1) % 4)}
            className="py-1 px-6 rounded-full bg-fadedWhite font-medium text-lg cursor-pointer hover:opacity-75 transition-opacity duration-200"
          >
            {filterOption === 0
              ? "All Boxes"
              : filterOption === 1
              ? "Alive Boxes"
              : filterOption === 2
              ? "Needs Water"
              : "Harvestable"}
            <i className="bi bi-arrow-repeat ml-2" />
          </div>
        </div>
        {filteredBoxes.length === 0 && <div className="text-center">Nothing to show.</div>}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-y-2">
          {filteredBoxes.slice((page - 1) * PLANTS_PER_PAGE, page * PLANTS_PER_PAGE).map((box, index) => (
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
        {filteredBoxes.length !== 0 && (
          <div className="flex justify-center items-center mt-12">
            <i
              onClick={() => setPage(Math.max(1, page - 1))}
              className="bi bi-caret-left-fill cursor-pointer text-lg"
            />
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
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col rounded-lg bg-white p-6">
          <div className="font-primary font-semibold text-fadedBlack text-xl">Stats</div>
          <div className="flex-1 flex flex-col justify-evenly text-base">
            <div className="flex justify-between">
              <span>🌰 Seeds / Box</span>
              <span>{(seedsPerBox / 10 ** 18).toFixed()} SEED</span>
            </div>
            <div className="flex justify-between">
              <span>⏰ Watering Period</span>
              <span>{(waterPeriod / 60000).toFixed()} Minutes</span>
            </div>
            <div className="flex justify-between">
              <span>📦 Alive Boxes</span>
              <span>{boxes.filter((box) => box.stage !== BoxStage.DEAD).length} Boxes</span>
            </div>
            <div className="flex justify-between">
              <span>💧 Needs Water</span>
              <span>{numNeedsWater} Boxes</span>
            </div>
            {boxes.filter((box) => box.waterBy !== 0 && box.stage !== BoxStage.STAGE_6).length !== 0 && (
              <div className="flex justify-between">
                <span>🚰 Next Watering by</span>
                <span>
                  {getHHMMString(
                    Math.min(
                      ...boxes
                        .filter((box) => box.waterBy !== 0 && box.stage !== BoxStage.STAGE_6)
                        .map((box) => box.waterBy)
                    )
                  )}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>🪴 Harvestable</span>
              <span>{boxes.filter((box) => box.stage === BoxStage.STAGE_6).length} Boxes</span>
            </div>
          </div>
        </div>
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
                disabled={numNeedsWater === 0}
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
                disabled={maxBoxes === 0}
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
