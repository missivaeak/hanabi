import type { GameRunnerSteps } from "../../types";
import { delay, makeError, makeResult } from "../../utils";
import type GameModel from "../GameModel.svelte";

export default function makeDrawDeckCard(handIndex: number) {
  return function drawDeckCard(game: GameModel): GameRunnerSteps {
    return [
      async () => {
        const topDeckCard = game.getDeckCard(-1);

        if (!topDeckCard) return makeError("No top deck card found");

        game.popCard(topDeckCard);

        if (handIndex === game.thisPlayerIndex) {
          topDeckCard.moveToThisPlayer(game.hands[handIndex].length);
        } else {
          topDeckCard.moveToOtherPlayer(
            game.hands[handIndex].length,
            game.getHandVisualIndex(handIndex),
            game.playerCount,
          );
        }

        game.hands[handIndex].push(topDeckCard.index);

        await delay(400);

        return makeResult(undefined);
      },
    ];
  };
}
