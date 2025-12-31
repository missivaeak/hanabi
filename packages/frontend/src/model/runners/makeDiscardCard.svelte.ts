import type { GameRunnerSteps } from "../../types";
import { makeError, makeResult } from "../../utils";
import type CardModel from "../CardModel.svelte";
import type GameModel from "../GameModel.svelte";
import TokenModel from "../TokenModel.svelte";
import makeDrawDeckCard from "./makeDrawDeckCard.svelte";
import rearrangeHands from "./rearrangeHands.svelte";

export default function makeDiscardCard(card: CardModel) {
  return function discardCard(game: GameModel): GameRunnerSteps {
    const { handIndex } = game.getHandPosition(card);

    if (handIndex === null) {
      return [async () => makeError("No corresponding handIndex found")];
    }

    return [
      async () => {
        game.popCard(card);
        game.discard.push(card.index);
        card.moveToDiscard(game.discard.length);
        const token = new TokenModel("clock");
        game.clockTokens.push(token);
        token.setClockPosition(game.clockTokens.length);
        game.signal({ type: "explosion", matrix: token.matrix.copy() });

        return makeResult(undefined);
      },
      ...rearrangeHands(game),
      ...makeDrawDeckCard(handIndex)(game),
    ];
  };
}
