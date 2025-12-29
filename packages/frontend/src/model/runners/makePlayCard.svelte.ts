import type { GameRunnerSteps } from "../../types";
import { delay, makeError, makeResult } from "../../utils";
import type CardModel from "../CardModel.svelte";
import type GameModel from "../GameModel.svelte";
import makePlayOrDiscard from "./playOrDiscard.svelte";
import rearrangeHands from "./rearrangeHands.svelte";

export default function makePlayCard(card: CardModel) {
  return function playCard(game: GameModel): GameRunnerSteps {
    const steps: GameRunnerSteps = [
      ...makePlayOrDiscard(card)(game),
      ...rearrangeHands(game),
      async () => {
        const { handIndex, handPosition } = game.getHandPosition(card);
        const topDeckCard = game.getDeckCard(-1, 'pop');
        if (!topDeckCard) return makeError('No top deck card found');
        if (!handIndex) {
          console.log($state.snapshot(game.hands[0]))
          console.log(card.index);
          return makeError('No hand index found');
        }
        topDeckCard.moveToThisPlayer(handPosition);
        game.hands[handIndex].push(topDeckCard.index);

        await delay(400);

        return makeResult(undefined);
      }
    ];

    return steps;
  }
}
