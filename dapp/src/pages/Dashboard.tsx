import React from "react";

// Hooks
import { useTypedSelector } from "../hooks";

// Utils
import { formatTokenBalance } from "../utils/strings";

// Assets
import BlueStripe from "../assets/images/fruits/blue_stripe.png";
import Mangrot from "../assets/images/fruits/mangrot.png";
import ElderGrape from "../assets/images/fruits/elder_grape.png";
import CrownApple from "../assets/images/fruits/crown_apple.png";
import SpotBerry from "../assets/images/fruits/spot_berry.png";

const Dashboard = () => {
  const { seedSupply, seedsPlanted, kUSDLocked, fruitsHarvested, numBoxes } = useTypedSelector((state) => state.stats);

  const seedSupplyString = formatTokenBalance(seedSupply, 18);
  const seedsPlantedString = formatTokenBalance(seedsPlanted, 18);

  const fruitsSupply = Object.values(fruitsHarvested)
    .map((i) => parseInt(i))
    .reduce((a, b) => a + b);

  return (
    <React.Fragment>
      {/* Liquidity Stats */}
      <div className="font-secondary rounded-lg bg-white p-6 grid grid-cols-2 md:grid-cols-3 gap-y-6">
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🌰 Seed Supply</div>
          <div className="font-semibold text-2xl">{seedSupplyString}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🪴 Seeds Planted</div>
          <div className="font-semibold text-2xl">{seedsPlantedString}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">💧 Seeds Circulating</div>
          <div className="font-semibold text-2xl">
            {(parseFloat(seedSupplyString) - parseFloat(seedsPlantedString)).toString()}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🔒 Pool TVL</div>
          <div className="font-semibold text-2xl">{formatTokenBalance(kUSDLocked, 18)} kUSD</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">📦 All Boxes</div>
          <div className="font-semibold text-2xl">{numBoxes}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🍇 Total Fruits</div>
          <div className="font-semibold text-2xl">{fruitsSupply}</div>
        </div>
      </div>
      {/* Fruits stats */}
      <div className="rounded-lg bg-white p-6 mt-6 font-secondary">
        <div className="font-medium text-fadedBlack text-center text-2xl mb-7">Fruits Supply</div>
        <div className="font-semibold  grid grid-cols-1 md:grid-cols-5 gap-y-6">
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={ElderGrape} />
            <div className="text-2xl mt-4">{fruitsHarvested.ELDER_GRAPE}</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={Mangrot} />
            <div className="text-2xl mt-4">{fruitsHarvested.MANGROT}</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={SpotBerry} />
            <div className="text-2xl mt-4">{fruitsHarvested.SPOT_BERRY}</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={BlueStripe} />
            <div className="text-2xl mt-4">{fruitsHarvested.BLUE_STRIPE}</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={CrownApple} />
            <div className="text-2xl mt-4">{fruitsHarvested.CROWN_APPLE}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
