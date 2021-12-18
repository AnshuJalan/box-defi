import { useState } from "react";

// Data
import { fruits, info } from "../data";

// Types
import { Fruits } from "../utils/global";
import { blockInvalidChars } from "../utils/input";

// Operations
import { deseed } from "../operations/farm";

// Hooks
import { useTypedSelector, useActions } from "../hooks";

// Components
import Button from "../components/Button";

// Assets
import SEED from "../assets/icons/seed.png";

const ID_TO_FRUIT: { [key: number]: Fruits } = {
  0: Fruits.ELDER_GRAPE,
  1: Fruits.MANGROT,
  2: Fruits.SPOT_BERRY,
  3: Fruits.BLUE_STRIPE,
  4: Fruits.CROWN_APPLE,
};

const Basket = () => {
  const [selectedFruit, setSelectedFruit] = useState<number>(0);
  const [deseedValue, setDeseedValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { setLoading, setSuccess, setFailure } = useActions();

  const { fruitBalances, isConnected } = useTypedSelector((state) => state.wallet);
  const { fruitsHarvested } = useTypedSelector((state) => state.stats);

  const handleFruitChange = (type: "Previous" | "Next") => {
    if (type === "Next") {
      setSelectedFruit((selectedFruit + 1) % 5);
    } else {
      setSelectedFruit(selectedFruit === 0 ? 4 : selectedFruit - 1);
    }
    setDeseedValue("");
    setError("");
  };

  const handleDeseed = async () => {
    // Validations
    setError("");
    if (deseedValue === "0" || parseInt(deseedValue) > parseInt(fruitBalances[ID_TO_FRUIT[selectedFruit]])) {
      setError("Invalid value!");
      return;
    }

    try {
      const op = await deseed(selectedFruit + 1, parseInt(deseedValue));
      if (op) {
        setLoading(`Deseeding ${fruits[ID_TO_FRUIT[selectedFruit]].name}`);
        await (await op.send()).confirmation(1);
        setSuccess("Deseeding successful!");
      }
    } catch (err: any) {
      setFailure(`Deseeding Failed: ${err.message}`);
    }
  };

  return (
    <div className="font-secondary rounded-lg bg-white p-6 2xl:w-3/4 mx-auto">
      <div className="font-primary font-semibold text-fadedBlack text-xl">Fruit Basket</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-5">
        <div className="flex flex-row justify-center items-center">
          <i onClick={() => handleFruitChange("Previous")} className="bi bi-caret-left-fill cursor-pointer text-3xl" />
          <img
            className="w-1/2 lg:w-2/3 mx-6"
            alt="fruit"
            src={require(`../assets/images/fruits/${ID_TO_FRUIT[selectedFruit].toLowerCase()}.png`).default}
          />
          <i onClick={() => handleFruitChange("Next")} className="bi bi-caret-right-fill cursor-pointer text-3xl" />
        </div>
        <div className="flex flex-col gap-y-6">
          <div>
            <div className="text-fadedBlack text-xl mb-2">Name</div>
            <div className="font-medium text-2xl">{fruits[ID_TO_FRUIT[selectedFruit]].name}</div>
          </div>
          <div>
            <div className="text-fadedBlack text-xl mb-2">Fruitpedia</div>
            <div className="font-medium text-xl">{fruits[ID_TO_FRUIT[selectedFruit]].description}</div>
          </div>
          <div>
            <div className="text-fadedBlack text-xl mb-2">Rarirty Score</div>
            <div className="font-medium text-2xl">{fruits[ID_TO_FRUIT[selectedFruit]].rarityScore}</div>
          </div>
          <div>
            <div className="text-fadedBlack text-xl mb-2">Owned</div>
            <div className="font-medium text-2xl">
              {fruitBalances[ID_TO_FRUIT[selectedFruit]]} of {fruitsHarvested[ID_TO_FRUIT[selectedFruit]]}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 rounded-lg bg-gray-200 p-3 md:w-10/12 m-auto">
        <i className="bi bi-info-circle mr-1" />
        {info.deseed}
      </div>
      <div className="mt-8">
        {error && (
          <div className="md:w-10/12 m-auto text-left text-base text-red-500">
            <i className="bi bi-exclamation-circle mr-2" />
            {error}
          </div>
        )}
        <div className="flex items-center rounded-lg bg-fadedWhite md:w-10/12 m-auto">
          <div
            className={`flex items-center p-2 rounded-tl-lg rounded-bl-lg bg-bg${fruits[ID_TO_FRUIT[selectedFruit]].name
              .split(" ")
              .join("")}`}
          >
            <img className="w-7" alt="kUSD" src={SEED} />
            <span className="text-lg font-semibold ml-2">DESEED</span>
          </div>
          <input
            type="number"
            value={deseedValue}
            onKeyDown={blockInvalidChars(["-", "+", "e", "E", "."])}
            onChange={(e) => setDeseedValue(e.target.value)}
            className="min-w-0 w-2/4 flex-grow rounded-tr-lg rounded-br-lg bg-fadedWhite focus:outline-none text-xl px-2"
            placeholder="0"
          />
          <span
            onClick={() => setDeseedValue(fruitBalances[ID_TO_FRUIT[selectedFruit]])}
            className="text-base font-semibold text-fadedBlack opacity-70 hover:opacity-100 mr-2 cursor-pointer"
          >
            MAX
          </span>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            text="De-seed"
            icon="flower1"
            disabled={!isConnected}
            background={`bg-bg${fruits[ID_TO_FRUIT[selectedFruit]].name.split(" ").join("")}`}
            onClick={handleDeseed}
          />
        </div>
      </div>
    </div>
  );
};

export default Basket;
