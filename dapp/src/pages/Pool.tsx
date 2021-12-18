import React, { useState, useEffect } from "react";

// Components
import Button from "../components/Button";

// Data
import { info } from "../data";

// Hooks
import { useActions, useTypedSelector } from "../hooks";

// Utils
import { divide, multiply } from "../utils/math";
import { formatTokenBalance } from "../utils/strings";
import { blockInvalidChars } from "../utils/input";

// Operations
import { lockTokens, unlockTokens } from "../operations/pool";

// Assets
import SEED from "../assets/icons/seed.png";
import kUSD from "../assets/icons/kUSD.png";

const Pool = () => {
  const [selected, setSelected] = useState<number>(0);
  const [kUSDValue, setkUSDValue] = useState<string>("");
  const [seedValue, setSeedValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { setLoading, setSuccess, setFailure } = useActions();

  const { tokenBalances, isConnected } = useTypedSelector((state) => state.wallet);
  const { seedSupply, kUSDLocked } = useTypedSelector((state) => state.stats);

  // Recalibrates output value of one tokens w.r.t to the other and operation type
  useEffect(() => {
    // If locking tokens
    if (selected === 0) {
      setSeedValue(divide(divide(multiply(multiply(kUSDValue, 10 ** 18), seedSupply), kUSDLocked), 10 ** 18));
    } else if (selected === 1) {
      setkUSDValue(divide(divide(multiply(multiply(seedValue, 10 ** 18), kUSDLocked), seedSupply), 10 ** 18));
    }
  }, [kUSDValue, seedValue, kUSDLocked, seedSupply, selected]);

  const submit = async () => {
    // Input validation
    setError("");
    if (selected === 0) {
      if (parseFloat(kUSDValue) > parseFloat(divide(tokenBalances.kUSD, 10 ** 18)) || kUSDValue === "0") {
        setError("Invalid kUSD amount!");
        return;
      }
    } else {
      if (parseFloat(seedValue) > parseFloat(divide(tokenBalances.SEED, 10 ** 18)) || seedValue === "0") {
        setError("Invalid SEED amount!");
        return;
      }
    }

    if (selected === 0) {
      try {
        const op = await lockTokens(kUSDValue);
        if (op) {
          setLoading("Locking kUSD");
          await (await op.send()).confirmation(1);
          setSuccess("Lockup of kUSD successful!");
        }
      } catch (err: any) {
        setFailure(`Locking Failed: ${err.message}`);
      }
    } else {
      try {
        const op = await unlockTokens(seedValue);
        if (op) {
          setLoading("Unlocking kUSD");
          await (await op.send()).confirmation(1);
          setSuccess("Unlock of kUSD successful!");
        }
      } catch (err: any) {
        setFailure(`Unlocking Failed: ${err.message}`);
      }
    }
  };

  const kUSDInput = (
    <div className="flex items-center rounded-lg bg-fadedWhite md:w-3/4 m-auto">
      <div className="flex items-center p-2 rounded-tl-lg rounded-bl-lg bg-bgGreen2">
        <img className="w-7" alt="kUSD" src={kUSD} />
        <span className="text-lg font-semibold ml-2">kUSD</span>
      </div>
      <input
        type="number"
        value={kUSDValue}
        onKeyDown={blockInvalidChars(["-", "+", "e", "E"])}
        onChange={(e) => setkUSDValue(e.target.value)}
        className="min-w-0 w-2/4 flex-grow rounded-tr-lg rounded-br-lg bg-fadedWhite focus:outline-none text-xl px-2"
        placeholder={selected === 0 ? "0.00" : "kUSD received (Approx)"}
        disabled={selected === 1}
      />
      {selected === 0 && (
        <span
          onClick={() => setkUSDValue(divide(tokenBalances.kUSD, 10 ** 18))}
          className="text-base font-semibold text-fadedBlack opacity-70 hover:opacity-100 mr-2 cursor-pointer"
        >
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
        type="number"
        value={seedValue}
        onKeyDown={blockInvalidChars(["-", "+", "e", "E"])}
        onChange={(e) => setSeedValue(e.target.value)}
        className="min-w-0 w-2/4 flex-grow rounded-tr-lg rounded-br-lg bg-fadedWhite focus:outline-none text-xl px-2"
        placeholder={selected === 1 ? "0.00" : "SEED received (Approx)"}
        disabled={selected === 0}
      />
      {selected === 1 && (
        <span
          onClick={() => setSeedValue(divide(tokenBalances.SEED, 10 ** 18))}
          className="text-base font-semibold text-fadedBlack opacity-70 hover:opacity-100 mr-2 cursor-pointer"
        >
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
          <div className="font-semibold text-2xl">{formatTokenBalance(kUSDLocked, 18)}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-fadedBlack text-base md:text-xl mb-1">🌰 Seed Supply</div>
          <div className="font-semibold text-2xl">{formatTokenBalance(seedSupply, 18)}</div>
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
          {error && (
            <div className="md:w-3/4 m-auto text-left text-base text-red-500 -mb-3">
              <i className="bi bi-exclamation-circle mr-2" />
              {error}
            </div>
          )}
          <React.Fragment>
            {selected === 0 ? kUSDInput : SEEDInput}
            <i className="bi bi-arrow-down-circle-fill text-blue-500 text-xl" />
            {selected === 1 ? kUSDInput : SEEDInput}
            <div className="mt-4">
              {selected === 0 ? (
                <Button
                  disabled={!isConnected}
                  text="Lock Tokens"
                  icon="lock-fill"
                  background="bg-bgGreen2"
                  onClick={submit}
                />
              ) : (
                <Button
                  disabled={!isConnected}
                  text="Unlock Tokens"
                  icon="unlock-fill"
                  background="bg-bgBrown"
                  onClick={submit}
                />
              )}
            </div>
          </React.Fragment>
        </div>
        <div className="mt-8 rounded-lg bg-gray-200 p-3 md:w-10/12 m-auto">
          <i className="bi bi-info-circle mr-1" />
          {info.pool}
        </div>
      </div>
    </div>
  );
};

export default Pool;
