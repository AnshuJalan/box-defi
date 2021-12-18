import { useState } from "react";

// Data
import { fruits, info } from "../data";

// Types
import { Fruits } from "../utils/global";

// Operations
import { merge } from "../operations/farm";

// Hooks
import { useTypedSelector, useActions } from "../hooks";

// Components
import Button from "../components/Button";

const ID_TO_FRUIT: { [key: number]: Fruits } = {
  0: Fruits.MANGROT,
  1: Fruits.SPOT_BERRY,
  2: Fruits.BLUE_STRIPE,
  3: Fruits.CROWN_APPLE,
};

const Wziard = () => {
  const [selectedFruit, setSelectedFruit] = useState<number>(0);

  const { setLoading, setSuccess, setFailure } = useActions();

  const { fruitBalances } = useTypedSelector((state) => state.wallet);

  const handleFruitChange = (type: "Previous" | "Next") => {
    if (type === "Next") {
      setSelectedFruit((selectedFruit + 1) % 4);
    } else {
      setSelectedFruit(selectedFruit === 0 ? 3 : selectedFruit - 1);
    }
  };

  const handleForge = async () => {
    try {
      const op = await merge(selectedFruit + 2);
      if (op) {
        setLoading(`Forging ${fruits[ID_TO_FRUIT[selectedFruit]].name}`);
        await (await op.send()).confirmation(1);
        setSuccess("Forging successful!");
      }
    } catch (err: any) {
      setFailure(`Forging Failed: ${err.message}`);
    }
  };

  const isPossibleToMake = () => {
    for (const fruit of Object.keys(fruits[ID_TO_FRUIT[selectedFruit]].wizardRequirements)) {
      if (
        parseInt(fruitBalances[fruit as Fruits]) <
        (fruits[ID_TO_FRUIT[selectedFruit]].wizardRequirements[fruit as Fruits] as number)
      ) {
        return "NO";
      }
    }
    return "YES";
  };

  return (
    <div className="font-secondary rounded-lg bg-white p-6 2xl:w-3/4 mx-auto">
      <div className="font-primary font-semibold text-fadedBlack text-xl">Fruit Wizard</div>
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
            <div className="text-fadedBlack text-xl mb-2">Fruit</div>
            <div className="font-medium text-2xl">{fruits[ID_TO_FRUIT[selectedFruit]].name}</div>
          </div>
          <div>
            <div className="text-fadedBlack text-xl mb-2">Requirements</div>
            <div className="font-medium text-xl">
              {Object.keys(fruits[ID_TO_FRUIT[selectedFruit]].wizardRequirements)
                .map(
                  (req) =>
                    `${fruits[ID_TO_FRUIT[selectedFruit]].wizardRequirements[req as Fruits]} ${
                      fruits[req as Fruits].name
                    }`
                )
                .join(", ")}
            </div>
          </div>
          <div>
            <div className="text-fadedBlack text-xl mb-2">Rarirty Score</div>
            <div className="font-medium text-2xl">{fruits[ID_TO_FRUIT[selectedFruit]].rarityScore}</div>
          </div>
          <div>
            <div className="text-fadedBlack text-xl mb-2">Possible to Make</div>
            <div className="font-medium text-2xl">{isPossibleToMake()}</div>
          </div>
        </div>
      </div>
      <div className="mt-12 rounded-lg bg-gray-200 p-3 md:w-10/12 m-auto">
        <i className="bi bi-info-circle mr-1" />
        {info.wizard}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          text="Forge"
          icon="magic"
          disabled={isPossibleToMake() === "NO"}
          background={`bg-bg${fruits[ID_TO_FRUIT[selectedFruit]].name.split(" ").join("")}`}
          onClick={handleForge}
        />
      </div>
    </div>
  );
};

export default Wziard;
