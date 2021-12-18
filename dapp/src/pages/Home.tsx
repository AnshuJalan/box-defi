// Assets
import BrandLarge from "../assets/images/brand_large.png";
import Growing from "../assets/images/growing_alt.gif";
import Overlap from "../assets/icons/overlap.png";
import Wizard from "../assets/icons/wizard.png";
import Knife from "../assets/icons/knife.png";
import Plant from "../assets/icons/plant.png";
import Fruit from "../assets/icons/fruit.png";
import Flash from "../assets/icons/flash.png";
import Rules from "../assets/images/rules.gif";

// Components
import Button from "../components/Button";

const Home = () => {
  return (
    <div>
      <div className="h-screen w-screen flex flex-col font-secondary p-2 lg:px-28 bg-white">
        <img className="w-52 m-auto lg:m-0" alt="brand_large" src={BrandLarge} />
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2">
          {/* Mobile only background */}
          <div
            style={{ backgroundImage: `url(${Growing})` }}
            className="lg:hidden bg-contain bg-center bg-no-repeat absolute left-4 w-full h-full opacity-10"
          ></div>
          <div className="flex flex-col font-medium text-center lg:text-left justify-center items-center lg:items-start text-4xl lg:text-5xl z-10">
            Experience Defi farming the gamified way on Tezos! Farm unique FRUITs using SEEDs in magical boxes 🪴
            <div className="mt-8">
              <Button
                icon="controller"
                iconSize="text-3xl"
                textColor="text-white"
                text="Start Farming"
                textSize="text-2xl"
                background="bg-bgOrange"
                onClick={() => window.open(window.origin + "/dashboard", "__blank")}
              />
            </div>
          </div>
          <div className="hidden lg:flex flex-col justify-center items-center">
            <img className="w-1/2 ml-auto" alt="growing" src={Growing} />
          </div>
        </div>
      </div>
      {/* Descriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 w-10/12 xl:w-3/4 m-auto gap-6 py-12">
        <div className="bg-white rounded-lg flex flex-col gap-4 justify-start items-center p-6">
          <div className="text-fadedBlack font-semibold font-primary text-xl">Box Pool</div>
          <img className="w-1/2" alt="seed" src={Overlap} />
          <div className="font-medium font-secondary text-lg text-center">
            Lock kUSD in Box Pool to get SEED. These SEED are FA1.2 tokens that represent your pool share & can be used
            to farm FRUIT in Box Farm.
          </div>
        </div>
        <div className="bg-white rounded-lg flex flex-col gap-4 justify-start items-center p-6">
          <div className="text-fadedBlack font-semibold font-primary text-xl">Box Farm</div>
          <img className="w-1/2" alt="growing" src={Plant} />
          <div className="font-medium font-secondary text-lg text-center">
            Plant SEED in magical boxes in the Box Farm and water them regularly to grow unique FRUIT. Each box requires
            exactly 10 SEED.
          </div>
        </div>
        <div className="bg-white rounded-lg flex flex-col gap-4 justify-start items-center p-6">
          <div className="text-fadedBlack font-semibold font-primary text-xl">Fruits</div>
          <img className="w-1/2" alt="seed" src={Fruit} />
          <div className="font-medium font-secondary text-lg text-center">
            FRUIT grown in Box Farm are semi-fungible FA2 tokens of varying rarity that are randomly generated when you
            harvest a grown plant.
          </div>
        </div>
        <div className="bg-white rounded-lg flex flex-col gap-4 justify-start items-center p-6">
          <div className="text-fadedBlack font-semibold font-primary text-xl">FRUIT DESEEDING</div>
          <img className="w-1/2" alt="seed" src={Knife} />
          <div className="font-medium font-secondary text-lg text-center">
            You can deseed your FRUIT to get back your original 10 SEED. This gives every FRUIT token a risk free value.
          </div>
        </div>
        <div className="bg-white rounded-lg flex flex-col gap-4 justify-start items-center p-6">
          <div className="text-fadedBlack font-semibold font-primary text-xl">FRUIT WIZARD</div>
          <img className="w-1/2" alt="seed" src={Wizard} />
          <div className="font-medium font-secondary text-lg text-center">
            There's a wizard in Box Land, that can take your less rare FRUIT and forge rarer fruits out of them
            instantly!
          </div>
        </div>
        <div className="bg-white rounded-lg flex flex-col gap-4 justify-start items-center p-6">
          <div className="text-fadedBlack font-semibold font-primary text-xl">FLASH LOANS</div>
          <img className="w-1/2" alt="seed" src={Flash} />
          <div className="font-medium font-secondary text-lg text-center">
            Box Pool puts kUSD to use by exposing a flash loan system with a 1% fee that goes to SEED holders when they
            unlock their share.
          </div>
        </div>
      </div>
      {/* Rules */}
      <div className="bg-white py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 w-10/12 xl:w-3/4 m-auto">
          <div className="flex items-center justify-center">
            <img alt="rules" src={Rules} />
          </div>
          <div>
            <div className="font-primary font-semibold text-fadedBlack text-2xl">
              <i className="bi bi-exclamation-circle mr-4" />
              Rules of Farming
            </div>
            <div className="font-secondary text-xl mt-4">
              As the saying goes - <b>"Rules. Without them we would live with the animals!"</b> There are rules that are
              enforced for farmers in Box Land.
              <div className="my-2 mt-4">🔴 Exactly 10 SEED tokens must be planted in a box to grow a FRUIT.</div>
              <div className="my-2">
                🔴 A plant box must be watered exactly once every watering period i.e 5 minutes. If not watered for two
                consecutive watering periods, the plant dies and the SEED tokens are lost forever.
              </div>
              <div className="my-2">
                🔴 Plants can be harvested after 4 watering periods. You would know which FRUIT you receive only after
                harvesting.
              </div>
              <div className="my-2">
                🔴 FRUIT grown in a plant box is absolutely random. The rarer the fruit, the lower the chance of
                receiving it upon harvesting.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Demo */}
      <div className="bg-white flex flex-col justify-center items-center rounded-lg w-10/12 xl:w-3/4 my-12 p-8 lg:p-8 mx-auto">
        <div className="text-center font-semibold font-primary text-3xl">
          <span style={{ color: "#FF9A00" }}>Demo</span> walkthrough
        </div>
        <div style={{ paddingBottom: "56.25%" }} className="relative w-full mt-8">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/zPnL_2UDKtc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-white flex flex-col justify-center items-center font-primary gap-y-10 py-8">
        <div>
          <img className="w-52 m-auto lg:m-0" alt="brand_large" src={BrandLarge} />
        </div>
        <div className="flex items-center text-4xl gap-4">
          <a href="https://github.com/AnshuJalan/box-defi" target="_blank" rel="noreferrer">
            <i className="bi bi-github"></i>
          </a>
          <a href="https://twitter.com/aj_jalan" target="_blank" rel="noreferrer">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://youtu.be/zPnL_2UDKtc" target="_blank" rel="noreferrer">
            <i className="bi bi-youtube"></i>
          </a>
        </div>
        <div className="text-xl text-center">
          💻 Developed by{" "}
          <a className="text-blue-500" href="https://twitter.com/AJ_Jalan" target="_blank" rel="noreferrer">
            @aj_jalan
          </a>{" "}
          ∙ 🎨 Art by{" "}
          <a className="text-blue-500" href="https://twitter.com/patra_anwesha" target="_blank" rel="noreferrer">
            @patra_anwesha
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
