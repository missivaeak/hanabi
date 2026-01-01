import type { GameRunnerSteps } from "../../types";
import { delay, makeResult, range } from "../../utils";
import type GameModel from "../GameModel.svelte";

export default function rearrangeHands(game: GameModel): GameRunnerSteps {
  return range(game.hands.length).map((handIndex) => async () => {
    const hand = game.hands[handIndex];

    if (hand.length === 4) return makeResult(undefined);

    for (let i = 0; i < hand.length; i++) {
      const cardIndex = hand[i];
      const card = game.cards[cardIndex];
      if (handIndex === game.thisPlayerIndex) {
        card.moveToThisPlayer(i);
      } else {
        card.moveToOtherPlayer(
          i,
          game.getHandVisualIndex(handIndex),
          game.playerCount,
        );
      }
    }

    await delay(400);

    return makeResult(undefined);
  });
}
