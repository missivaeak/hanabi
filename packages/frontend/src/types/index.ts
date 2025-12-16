import { type Color } from "@repo/shared";

export type CardState = { color: Color; pips: number };

export const controllerLocations = ["deck", "discard", "hand"] as const;
export type ControllerLocation = (typeof controllerLocations)[number];

export type Model = {
  transform?: string[];
  translate?: string;
  rotate?: string;
  scale?: string;
  skew?: string;
};
