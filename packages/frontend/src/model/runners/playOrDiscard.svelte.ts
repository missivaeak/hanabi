import type { GameRunnerSteps } from "../../types";
import { delay, makeResult } from "../../utils";
import type CardModel from "../CardModel.svelte";
import type GameModel from "../GameModel.svelte";

export default function makePlayOrDiscard(card: CardModel) {
  return function playOrDiscard(game: GameModel): GameRunnerSteps {
    const steps: GameRunnerSteps = [
      async () => {
        console.log($state.snapshot(game.hands[0]))
        game.popCard(card);
        console.log($state.snapshot(game.hands[0]))

        if (game.isCardPlayable(card)) {
          game.played.push(card.index);
          card.moveToPlayed();

          await delay(400);

          return makeResult(undefined);
        }

        game.signal({ type: 'explosion', matrix: game.fuseTokens[game.fuseTokens.length - 1].matrix.copy() })
        game.fuseTokens.length -= 1;
        game.discard.push(card.index);
        card.moveToDiscard(game.discard.length);

        await delay(400);

        return makeResult(undefined);
      }
    ];

    return steps;
  }
}
