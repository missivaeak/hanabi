import type { GameRunnerSteps, Result } from "../../types";
import { delay, HAND_SIZE, makeError, makeResult, range } from "../../utils";
import type GameModel from "../GameModel.svelte";
import setupPlayer from "./setupPlayer.svelte";
import setupControls from "./setupControls.svelte";

export default function deal(game: GameModel): GameRunnerSteps {
  async function deal(handIndex: number) {
    const cardIndex = game.deck.pop();

    if (cardIndex === undefined) {
      return makeError("Unable to find top deck card");
    }

    const card = game.cards[cardIndex];
    const hand = game.hands[handIndex];
    hand.push(cardIndex);

    if (handIndex === game.thisPlayerIndex) {
      card.moveToThisPlayer(hand.length - 1);
    } else {
      card.moveToOtherPlayer(
        hand.length - 1,
        game.getHandVisualIndex(handIndex),
        game.playerCount,
      );
    }

    await delay();

    return makeResult(undefined);
  }

  return [
    ...range(game.playerCount).flatMap((handIndex) =>
      range(HAND_SIZE).flatMap((_) => async () => deal(handIndex)),
    ),
    ...setupPlayer(game),
    ...setupControls(game),
  ];
}
