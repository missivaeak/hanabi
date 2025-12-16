import { colors } from "@repo/shared";
import CardModel from "./CardModel.svelte";
import { mod } from "../utils";

type GameState = {
  playerCount?: number;
  deck?: number[];
  discard?: number[];
  hands?: number[][];
  player?: number;
};

const pipDistribution = [3, 2, 2, 2, 1].reduce<number[]>((acc, amount, j) => {
  const pips = Array(amount).fill(j + 1);
  return acc.concat(pips);
}, []);

export default class Hanabi {
  cards: CardModel[];
  playerCount: number;
  deck: number[];
  discard: number[];
  hands: number[][];
  player: number;

  static makeDeck() {
    return colors.flatMap((color) =>
      pipDistribution.map((pips) => new CardModel(color, pips)),
    );
  }

  constructor({
    playerCount,
    deck,
    discard,
    hands,
    player,
  }: GameState | undefined = {}) {
    this.cards = $state(Hanabi.makeDeck());
    this.playerCount = playerCount ?? 4;
    this.player = player ?? 0;
    this.hands = $state(hands ?? Array(this.playerCount).fill([]));
    this.deck = $state(
      deck ?? this.cards.map((_, i) => i).sort(() => Math.random() - 0.5),
    );
    this.discard = $state(discard ?? []);

    for (let i = 0; i < this.deck.length; i++) {
      const cardIndex = this.deck[i];
      this.cards[cardIndex].setDeckPosition(i);
    }
  }

  async deal() {
    // Deal
    for (let i = 0; i < this.playerCount; i++) {
      for (let j = 0; j < 4; j++) {
        const cardIndex = this.deck.pop();

        if (cardIndex === undefined) {
          console.warn("Ran out of cards when dealing");
          continue;
        }

        const card = this.cards[cardIndex];
        const hand = this.hands[i];

        if (i === this.player) {
          await card.setPlayerHandPosition(hand.length);
        } else {
          const otherIndex = (this.player + i).mod(this.playerCount);
          await card.setOtherHandPosition(
            hand.length,
            otherIndex,
            this.playerCount,
          );
        }

        hand.push(cardIndex);
        card.onClick = () => {
          card.play();
          card.onClick = undefined;
        };
      }
    }

    const setupTopCard = () => {
      const topCard = this.getDeckCard(-1);
      if (topCard) {
        topCard.onClick = () => {
          topCard.play();
          topCard.onClick = undefined;
          this.deck.pop();
          setupTopCard();
        };
      }
    };
    setupTopCard();
  }

  private getHandCard(handIndex: number, handPosition: number, pop?: "pop") {
    const cardIndex = this.hands[handIndex][handPosition] ?? -1;

    if (pop) {
      this.hands[handIndex].splice(handPosition, 1);
    }

    const card = this.cards[cardIndex];

    return card ? card : null;
  }

  private getDeckCard(deckPosition: number, pop?: "pop") {
    const deckIndex =
      deckPosition >= 0 ? deckPosition : this.deck.length + deckPosition;
    console.log(this.deck.length);
    const cardIndex = this.deck[deckIndex] ?? -1;

    if (pop) {
      this.deck.splice(deckPosition, 1);
    }

    const card = this.cards[cardIndex];

    return card ? card : null;
  }

  onClick = async () => {};
}
