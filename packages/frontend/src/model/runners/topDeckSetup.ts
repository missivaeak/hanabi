import type { GameRunnerSteps } from "../../types";
import { makeError, makeResult } from "../../utils";
import type GameModel from "../GameModel.svelte";

export default function topDeckSetup(game: GameModel): GameRunnerSteps {
  function setupTopDeckCard() {
    const card = game.getDeckCard(-1);

    if (!card) return makeError("Cannot find top deck card");

    card.onClick = async () => {
      card.onClick = undefined;
      game.deck.pop();
      const nextCard = game.getDeckCard(-1);
      if (nextCard) setupTopDeckCard();
      await game.playOrDiscard(card);
    };

    return makeResult(undefined);
  }

  return [async () => await setupTopDeckCard()];
}
