import type { GameRunnerSteps } from "../../types";
import { delay, makeError, makeResult } from "../../utils";
import type CardModel from "../CardModel.svelte";
import type GameModel from "../GameModel.svelte";
import makeDrawDeckCard from "./makeDrawDeckCard.svelte";
import rearrangeHands from "./rearrangeHands.svelte";

export default function makePlayCard(card: CardModel) {
  return function playCard(game: GameModel): GameRunnerSteps {
    const { handIndex } = game.getHandPosition(card);

    if (handIndex === null) {
      return [async () => makeError("No corresponding handIndex found")];
    }

    return [
      async () => {
        game.popCard(card);

        if (game.isCardPlayable(card)) {
          game.played.push(card.index);
          card.moveToPlayed();

          await delay(400);

          return makeResult(undefined);
        }

        game.signal({
          type: "explosion",
          matrix: game.fuseTokens[game.fuseTokens.length - 1].matrix.copy(),
        });
        game.fuseTokens.length -= 1;
        game.discard.push(card.index);
        card.moveToDiscard(game.discard.length);

        await delay(400);

        return makeResult(undefined);
      },
      ...rearrangeHands(game),
      ...makeDrawDeckCard(handIndex)(game),
    ];
  };
}
