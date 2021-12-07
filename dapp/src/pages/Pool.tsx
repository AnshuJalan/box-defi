import React, { useState } from "react";

// Components
import Button from "../components/Button";

// Data
import data from "../data/index.json";

// Assets
import SEED from "../assets/icons/seed.png";
import kUSD from "../assets/icons/kUSD.png";

const Pool = () => {
  const [selected, setSelected] = useState<number>(0);

  const kUSDInput = (
    <div className="flex items-center rounded-lg bg-fadedWhite md:w-3/4 m-auto">
      <div className="flex items-center p-2 rounded-tl-lg rounded-bl-lg bg-bgGreen2">
        <img className="w-7" alt="kUSD" src={kUSD} />
        <span className="text-lg font-semibold ml-2">kUSD</span>
      </div>
      <input
        className="min-w-0 w-2/4 flex-grow rounded-tr-lg rounded-br-lg bg-fadedWhite focus:outline-none text-xl px-2"
        placeholder="0.00"
      />
      {selected === 0 && (
        <span className="text-base font-semibold text-fadedBlack opacity-70 hover:opacity-100 mr-2 cursor-pointer">
          MAX
        </span>
      )}
    </div>
  );

  const SEEDInput = (
    <div className="flex items-center rounded-lg bg-fadedWhite md:w-3/4 m-auto">
      <div className="flex items-center p-2 rounded-tl-lg rounded-bl-lg bg-bgBrown">
        <img className="w-7" alt="kUSD" src={SEED} />
        <span className="text-lg font-semibold ml-2">SEED</span>
      </div>
      <input
        className="min-w-0 w-2/4 flex-grow rounded-tr-lg rounded-br-lg bg-fadedWhite focus:outline-none text-xl px-2"
        placeholder="0.00"
      />
      {selected === 1 && (
        <span className="text-base font-semibold text-fadedBlack opacity-70 hover:opacity-100 mr-2 cursor-pointer">
          MAX
        </span>
      )}
    </div>
  );

  return (
    <div className="font-secondary rounded-lg bg-white p-6 md:w-3/4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6">
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🔒 Locked kUSD</div>
          <div className="font-semibold text-2xl">32,000</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🌰 Seed Supply</div>
          <div className="font-semibold text-2xl">31,500</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🚀 Flash Loan Fee</div>
          <div className="font-semibold text-2xl">1.00 %</div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex justify-center gap-x-6 items-center text-2xl transition-all duration-300">
          <div
            onClick={() => setSelected(0)}
            className={`cursor-pointer flex flex-col gap-y-1 items-center ${
              selected === 0 ? "text-black" : "text-fadedBlack"
            }`}
          >
            Lock
            <span className={`h-0.5 w-full m-auto ${selected === 0 && "bg-black"}`}></span>
          </div>
          <div
            onClick={() => setSelected(1)}
            className={`cursor-pointer flex flex-col gap-y-1 ${selected === 1 ? "text-black" : "text-fadedBlack"}`}
          >
            Unlock
            <span className={`h-0.5 w-full m-auto ${selected === 1 && "bg-black"}`}></span>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-y-4">
          <React.Fragment>
            {selected === 0 ? kUSDInput : SEEDInput}
            <i className="bi bi-arrow-down-circle-fill text-blue-500 text-xl" />
            {selected === 1 ? kUSDInput : SEEDInput}
            <div className="mt-4">
              {selected === 0 ? (
                <Button text="Lock Tokens" icon="lock-fill" background="bg-bgGreen2" onClick={() => true} />
              ) : (
                <Button text="Unlock Tokens" icon="unlock-fill" background="bg-bgBrown" onClick={() => true} />
              )}
            </div>
          </React.Fragment>
        </div>
        <div className="mt-8 rounded-lg bg-gray-200 p-3 md:w-10/12 m-auto">
          <i className="bi bi-info-circle mr-1" />
          {data.poolInfo}
        </div>
      </div>
    </div>
  );
};

export default Pool;
