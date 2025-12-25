import type { GameRunnerSteps, Result } from "../../types";
import { HAND_SIZE, makeError, makeResult, range } from "../../utils";
import type GameModel from "../GameModel.svelte";

export default function handSetup(game: GameModel): GameRunnerSteps {
  function setupHandCard(
    handIndex: number,
    handPosition: number,
  ): Result<void> {
    const card = game.getHandCard(handIndex, handPosition);

    if (!card) {
      return makeError(
        `Hand ${handIndex}, handPosition ${handPosition} card not found`,
      );
    }

    card.onClick = async () => {
      game.getHandCard(handIndex, handPosition, "pop");
      card.onClick = undefined;
      await game.playOrDiscard(card);
    };

    return makeResult(undefined);
  }

  return range(game.playerCount).flatMap((handIndex) =>
    range(HAND_SIZE).flatMap((handPosition) => [
      async () => setupHandCard(handIndex, handPosition),
    ]),
  );
}
