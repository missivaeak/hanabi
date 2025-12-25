import type GameModel from "../GameModel.svelte";
import GameRunner, { type GameRunnerClass } from "../GameRunner";

export default class Dealer extends GameRunner {
  getSteps() {
    return [this.deal];
  }

  deal = async () => {
    // Deal
    for (let i = 0; i < this.game.playerCount; i++) {
      for (let j = 0; j < 4; j++) {
        const cardIndex = this.game.deck.pop();
        if (cardIndex === undefined) continue;
        const card = this.game.cards[cardIndex];
        const hand = this.game.hands[i];
        hand.push(cardIndex);
        this.game.setupHandCard(card);

        if (i === this.game.player) {
          await card.setPlayerHandPosition(hand.length - 1);
        } else {
          const otherIndex =
            (i - this.game.player).mod(this.game.playerCount) - 1;
          await card.setOtherHandPosition(
            hand.length - 1,
            otherIndex,
            this.game.playerCount,
          );
        }
      }
    }

    const topDeckCard = this.game.getDeckCard(-1);
    if (topDeckCard) this.game.setupTopDeckCard(topDeckCard);

    const topDiscardCard = this.game.getDiscardCard(-1);
    if (topDiscardCard) this.game.setupTopDiscardCard(topDiscardCard);

    return {
      value: null,
      error: null,
    };
  };
}
