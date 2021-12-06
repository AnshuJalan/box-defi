import React from "react";

// Assets
import BlueStripe from "../assets/images/fruits/blue_stripe.png";
import Mangrot from "../assets/images/fruits/mangrot.png";
import ElderGrape from "../assets/images/fruits/elder_grape.png";
import CrownApple from "../assets/images/fruits/crown_apple.png";
import SpotBerry from "../assets/images/fruits/spot_berry.png";

const Dashboard = () => {
  return (
    <React.Fragment>
      {/* Liquidity Stats */}
      <div className="font-secondary rounded-lg bg-white p-6 grid grid-cols-2 md:grid-cols-3 gap-y-6">
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🌰 Seed Supply</div>
          <div className="font-semibold text-2xl">250,000</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🪴 Seeds Planted</div>
          <div className="font-semibold text-2xl">120,400</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">💧 Seeds Circulating</div>
          <div className="font-semibold text-2xl">124,600</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🔒 Pool TVL</div>
          <div className="font-semibold text-2xl">$ 241,000</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">📦 Live Boxes</div>
          <div className="font-semibold text-2xl">53,450</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🍇 Total Fruits</div>
          <div className="font-semibold text-2xl">525</div>
        </div>
      </div>
      {/* Fruits stats */}
      <div className="rounded-lg bg-white p-6 mt-6 font-secondary">
        <div className="font-medium text-fadedBlack text-center text-2xl mb-7">Fruits Harvested</div>
        <div className="font-semibold  grid grid-cols-1 md:grid-cols-5 gap-y-6">
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={ElderGrape} />
            <div className="text-2xl mt-4">251</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={Mangrot} />
            <div className="text-2xl mt-4">127</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={SpotBerry} />
            <div className="text-2xl mt-4">95</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={BlueStripe} />
            <div className="text-2xl mt-4">43</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-6/12 md:w-8/12" alt="fruit" src={CrownApple} />
            <div className="text-2xl mt-4">12</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
