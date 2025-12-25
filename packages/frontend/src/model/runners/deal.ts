import type { GameRunnerSteps, Result } from "../../types";
import { HAND_SIZE, makeError, makeResult, range } from "../../utils";
import type GameModel from "../GameModel.svelte";
import handSetup from "./handSetup";
import topDeckSetup from "./topDeckSetup";

export default function (game: GameModel): GameRunnerSteps {
  function dealAll() {
    return range(game.playerCount).flatMap((handIndex) =>
      range(HAND_SIZE).flatMap((_) => async () => await deal(handIndex)),
    );
  }

  async function deal(handIndex: number) {
    const cardIndex = game.deck.pop();

    if (cardIndex === undefined) {
      return makeError("Unable to find top deck card");
    }

    const card = game.cards[cardIndex];
    const hand = game.hands[handIndex];
    hand.push(cardIndex);

    if (handIndex === game.player) {
      await card.setPlayerHandPosition(hand.length - 1);
    } else {
      const otherIndex = (handIndex - game.player).mod(game.playerCount) - 1;
      await card.setOtherHandPosition(
        hand.length - 1,
        otherIndex,
        game.playerCount,
      );
    }

    return makeResult(undefined);
  }

  return [...dealAll(), ...handSetup(game), ...topDeckSetup(game)];
}
