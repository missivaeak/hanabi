import type GameModel from "../model/GameModel.svelte";
export type Result<T extends any = void> = {
  value: T | null;
  error: string | null;
};
