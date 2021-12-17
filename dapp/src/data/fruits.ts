import { Fruits } from "../utils/global";

export const fruits: {
  [key in keyof typeof Fruits]: {
    name: string;
    description: string;
    rarityScore: string;
    wizardRequirements: {
      [key in keyof typeof Fruits]?: number;
    };
  };
} = {
  [Fruits.ELDER_GRAPE]: {
    name: "Elder Grape",
    description: "The staple fruit of Box Land. Elder Grape is known to have a shelf life of a few hundred years.",
    rarityScore: "1/5",
    wizardRequirements: {},
  },
  [Fruits.MANGROT]: {
    name: "Mangrot",
    description: "One day a botanist in Box Land decided to cross-breed mango and carrot, giving birth to Mangrot!",
    rarityScore: "2/5",
    wizardRequirements: {
      [Fruits.ELDER_GRAPE]: 4,
    },
  },
  [Fruits.SPOT_BERRY]: {
    name: "Spot Berry",
    description: "Found in the wilderness of Box Forest, Spot Berry can cure a thousand diseases.",
    rarityScore: "3/5",
    wizardRequirements: {
      [Fruits.ELDER_GRAPE]: 3,
      [Fruits.MANGROT]: 3,
    },
  },
  [Fruits.BLUE_STRIPE]: {
    name: "Blue Stripe",
    description: "Hidden deep in the lakes of Box Land is Blue Stripe, the most exotic of all fruits.",
    rarityScore: "4/5",
    wizardRequirements: {
      [Fruits.ELDER_GRAPE]: 2,
      [Fruits.MANGROT]: 2,
      [Fruits.SPOT_BERRY]: 2,
    },
  },
  [Fruits.CROWN_APPLE]: {
    name: "Crown Apple",
    description:
      "The rarest and the most mysterious of all is Crown Apple. It is not to be found, because it presents itself only to the chosen ones.",
    rarityScore: "5/5",
    wizardRequirements: {
      [Fruits.ELDER_GRAPE]: 1,
      [Fruits.MANGROT]: 1,
      [Fruits.SPOT_BERRY]: 1,
      [Fruits.BLUE_STRIPE]: 1,
    },
  },
};
