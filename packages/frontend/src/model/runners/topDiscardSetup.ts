import type { GameRunnerSteps } from "../../types";
import { makeError, makeResult } from "../../utils";
import type GameModel from "../GameModel.svelte";

export default function topDiscardSetup(game: GameModel): GameRunnerSteps {
  function setupTopDiscardCard() {
    const card = game.getDiscardCard(-1);

    if (!card) return makeError("No top discard card found");

    card.onClick = () => {
      console.log("clicks discard");
    };

    return makeResult(undefined);
  }

  return [async () => setupTopDiscardCard()];
}
