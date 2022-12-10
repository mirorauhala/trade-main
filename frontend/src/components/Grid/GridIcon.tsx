import { Map, Food, Exhibitors, Faq, Program } from "@/components/Grid/icons";
import { createElement } from "react";

const icons = {
  MAP: Map,
  FOOD: Food,
  EXHIBITORS: Exhibitors,
  FAQ: Faq,
  PROGRAM: Program,
};

type GridIconProps = {
  icon: keyof typeof icons;
};

export const GridIcon = ({ icon }: GridIconProps) => {
  return createElement(icons[icon]);
};
