import { concrete_grades } from "./concrete_grades";
import { concrete_conversion_factor } from "./constants";

export const concrete_dry_volume = (wetVolume) => {
  return wetVolume * concrete_conversion_factor;
};

export const calculation_for_1cum = (grade) => {
  const { cement, fine_aggregate, coarse_aggregate } = concrete_grades[grade];
};
