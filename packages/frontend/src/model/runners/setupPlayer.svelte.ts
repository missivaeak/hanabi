import { makeResult } from "../../utils";
import type GameModel from "../GameModel.svelte";

export default function setupPlayer(game: GameModel) {
  function setupThisPlayer() {
    return makeResult(undefined);
  }

  function setupOtherPlayer() {
    return makeResult(undefined);
  }

  function setupPlayer() {
    if (game.currentTurn.mod(game.playerCount) === game.thisPlayerIndex) {
      return setupThisPlayer();
    }

    return setupOtherPlayer();
  }

  return [async () => setupPlayer()];
}
