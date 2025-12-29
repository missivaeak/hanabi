import type { GameRunnerSteps } from "../../types";
import { delay, makeResult } from "../../utils";
import type GameModel from "../GameModel.svelte";

export default function rearrangeHands(game: GameModel): GameRunnerSteps {
  const steps: GameRunnerSteps = game.hands.map((hand, handIndex) => async () => {
    if (hand.length === 4) return makeResult(undefined);

    console.log($state.snapshot(hand));

    for (let i = 0; i < hand.length; i++) {
      const cardIndex = hand[i];
      const card = game.cards[cardIndex];
      if (handIndex === game.thisPlayerIndex) {
        card.moveToThisPlayer(i);
      } else {
        card.moveToOtherPlayer(i, game.getHandVisualIndex(handIndex), game.playerCount);
      }
      await delay(400);
    }

    return makeResult(undefined);
  });

  return steps;
}
