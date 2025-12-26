import type { GameRunnerSteps } from "../../types";
import { makeResult } from "../../utils";
import type ControlsModel from "../ControlsModel.svelte";
import type GameModel from "../GameModel.svelte";

export default function setupControls(game: GameModel): GameRunnerSteps {
  function setupThisPlayerControls(controls: ControlsModel) {
    controls.items.push({
      key: "test",
      onClick: () => console.log("aotnehatoeh"),
      text: "Press me",
    });
    return makeResult(undefined);
  }

  function setupOtherPlayerControls(controls: ControlsModel) {
    controls.items.push({
      key: "clue",
      onClick: () => console.log("aotnehatoeh"),
      icon: "magnifying-glass",
    });
    return makeResult(undefined);
  }

  return game.controls.map((controls, playerIndex) => {
    if (playerIndex === game.thisPlayerIndex) {
      return async () => setupThisPlayerControls(controls);
    }

    return async () => setupOtherPlayerControls(controls);
  });
}
