import type GameModel from "./GameModel.svelte";
import type { Result } from "../types/index.ts";

export default abstract class GameRunner {
  constructor(protected game: GameModel) {}

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  getSteps(): GameRunnerSteps {
    return [];
  }

  revert() {}

  protected getSubSteps(Runner: GameRunnerClass): GameRunnerSteps {
    const runner = new Runner(this.game);
    return runner.getSteps();
  }
}

export type GameRunnerSteps = (() => Promise<Result<void>>)[];

export type GameRunnerClass = {
  new (game: GameModel): GameRunner;
};
