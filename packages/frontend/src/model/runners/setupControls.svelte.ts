import type { GameRunnerSteps } from "../../types";
import { makeResult } from "../../utils";
import type ControlsModel from "../ControlsModel.svelte";
import type GameModel from "../GameModel.svelte";
import makeDiscardCard from "./makeDiscardCard.svelte";
import makePlayCard from "./makePlayCard.svelte";

export default function setupControls(game: GameModel): GameRunnerSteps {
  function setupThisPlayerControls(controls: ControlsModel) {
    const thisHand = game.hands[game.thisPlayerIndex];
    const cards = thisHand.map((index) => game.cards[index]);

    for (const card of cards) {
      card.onClick = () => {
        const key = `play-${card.index}`;

        if (controls.items[0]?.key === key) {
          controls.items = [];
          return;
        }

        controls.moveToAboveCard(card.matrix);
        controls.items = [
          {
            key,
            onClick: () => {
              controls.items = [];
              card.onClick = undefined;
              game.execute(makePlayCard(card));
            },
            text: "Play card",
            icon: "play",
          },
          {
            key: `discard-${card.index}`,
            onClick: () => {
              controls.items = [];
              card.onClick = undefined;
              game.execute(makeDiscardCard(card));
            },
            text: "Discard",
            icon: "discard",
          },
        ];
      };
    }
    return makeResult(undefined);
  }

  function setupOtherPlayerControls(controls: ControlsModel) {
    controls.items.push({
      key: "clue",
      onClick: () => console.log("aotnehatoeh"),
      text: "Give clue",
      icon: "magnifying-glass",
    });
    return makeResult(undefined);
  }

  return game.controls.map((controls, playerIndex) => {
    if (playerIndex === game.thisPlayerIndex) {
      return async () => setupThisPlayerControls(controls);
    }

    return async () => setupOtherPlayerControls(controls);
  });
}
