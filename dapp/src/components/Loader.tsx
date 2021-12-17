import React from "react";

// Hooks
import { useActions, useTypedSelector } from "../hooks";

// Types
import { Status } from "../redux/reducers/loader";

// Assets
import Growing from "../assets/images/growing.gif";
import Deseeding from "../assets/images/knife_deseed.gif";
import Wizard from "../assets/images/wizard.gif";
import Watering from "../assets/images/watering.gif";

const Loader = () => {
  const { status, show, text } = useTypedSelector((state) => state.loader);

  const { hideLoader } = useActions();

  if (!show) {
    return <React.Fragment></React.Fragment>;
  }

  if (status === Status.LOADING) {
    return (
      <div className="w-screen h-screen fixed bg-black bg-opacity-90 z-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 flex flex-col items-center">
          <img
            className={text.toLowerCase().includes("deseeding") ? "w-44" : "w-24"}
            alt="loader"
            src={
              text.toLowerCase().includes("watering")
                ? Watering
                : text.toLowerCase().includes("deseeding")
                ? Deseeding
                : text.toLowerCase().includes("forging")
                ? Wizard
                : Growing
            }
          />
          <div className="font-primary text-2xl mt-8 text-white">{text}</div>
        </div>
      </div>
    );
  } else if (status === Status.SUCCESS) {
    return (
      <div className="w-screen h-screen fixed bg-black bg-opacity-90 z-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 flex flex-col items-center rounded-lg bg-white py-8 px-12">
          <i className="bi bi-check-circle-fill text-8xl text-green-600" />
          <div className="font-primary text-center font-medium text-3xl mt-8 text-black">{text}</div>
          <div
            onClick={hideLoader}
            className="mt-4 cursor-pointer font-secondary font-semibold text-sm text-gray-400 hover:text-black"
          >
            Go Back
          </div>
        </div>
      </div>
    );
  } else if (status === Status.FAILURE) {
    return (
      <div className="w-screen h-screen fixed bg-black bg-opacity-90 z-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 flex flex-col items-center rounded-lg bg-white py-8 px-12">
          <i className="bi bi-x-circle-fill text-8xl text-red-600" />
          <div className="font-primary font-medium text-center text-3xl mt-8 text-black">{text}</div>
          <div
            onClick={hideLoader}
            className="mt-4 cursor-pointer font-secondary font-semibold text-sm text-gray-400 hover:text-black"
          >
            Go Back
          </div>
        </div>
      </div>
    );
  }

  return <React.Fragment></React.Fragment>;
};

export default Loader;
