// Data
import { info } from "../data";

// Operations
import { getTokens } from "../operations/faucet";

// Hooks
import { useActions } from "../hooks";

// Components
import Button from "../components/Button";

const Faucet = () => {
  const { setLoading, setSuccess, setFailure } = useActions();

  const handleGetTokens = async () => {
    try {
      const op = await getTokens();
      if (op) {
        setLoading("Getting test kUSD");
        await (await op.send()).confirmation(1);
        setSuccess("Test kUSD credited!");
      }
    } catch (err: any) {
      setFailure(`Transaction Failed: ${err.message}`);
    }
  };

  return (
    <div className="font-secondary rounded-lg bg-white p-6 2xl:w-3/4 mx-auto">
      <div className="font-primary font-semibold text-fadedBlack text-xl">Test kUSD Faucet</div>
      <div className="mt-5 rounded-lg bg-gray-200 p-3 md:w-10/12 m-auto">
        <i className="bi bi-info-circle mr-1" />
        {info.faucet}
      </div>
      <div className="flex justify-center mt-4">
        <Button text="Get Tokens" background="bg-green-400" icon="droplet" onClick={handleGetTokens} />
      </div>
    </div>
  );
};

export default Faucet;
