import { colors } from "@repo/shared";
import CardModel from "./CardModel.svelte";
import TokenModel from "./TokenModel.svelte";
import { delay, range } from "../utils";
import type { GameRunnerSteps } from "../types";
import ControlsModel from "./ControlsModel.svelte";

type GameState = {
  playerCount?: number;
  deck?: number[];
  discard?: number[];
  hands?: number[][];
  thisPlayerIndex?: number;
  clockTokens?: number;
  fuseTokens?: number;
  played?: number[];
};

const pipDistribution = [3, 2, 2, 2, 1].reduce<number[]>((acc, amount, j) => {
  const pips = Array(amount).fill(j + 1);
  return acc.concat(pips);
}, []);

export default class GameModel {
  static makeDeck() {
    return colors.flatMap((color, i) =>
      pipDistribution.map(
        (pips, j) => new CardModel(color, pips, i * pipDistribution.length + j),
      ),
    );
  }

  static makeClockTokens(count: number) {
    return range(count).map((i) => {
      const token = new TokenModel("clock");
      token.setClockPosition(i);
      return token;
    });
  }

  static makeFuseTokens(count: number) {
    return range(count).map((i) => {
      const token = new TokenModel("fuse");
      token.setFusePosition(i);
      return token;
    });
  }

  cards: CardModel[];
  playerCount: number;
  deck: number[];
  discard: number[];
  hands: number[][];
  played: number[];
  thisPlayerIndex: number;
  currentTurn = 0;
  endTurn = Number.MAX_SAFE_INTEGER;
  clockTokens: TokenModel[];
  fuseTokens: TokenModel[];
  controls: ControlsModel[];
  cheat: Record<string, unknown>[];

  constructor({
    playerCount,
    deck,
    discard,
    hands,
    thisPlayerIndex,
    clockTokens,
    fuseTokens,
    played,
  }: GameState | undefined = {}) {
    this.cards = GameModel.makeDeck();
    this.playerCount = playerCount ?? Math.floor(Math.random() * 2 + 3.5);
    this.thisPlayerIndex =
      thisPlayerIndex ?? Math.floor(Math.random() * this.playerCount);
    this.hands = $state([]);
    this.controls = $state([]);
    for (let i = 0; i < this.playerCount; i++) {
      const hand = $state(hands ? hands[i] : []);
      this.hands[i] = hand;
      this.controls[i] = new ControlsModel();
      this.controls[i].moveToBasePosition(
        this.getHandVisualIndex(i),
        this.playerCount,
      );
    }
    this.deck = $state(
      deck ?? this.cards.map((_, i) => i).sort(() => Math.random() - 0.5),
    );
    this.discard = $state(discard ?? []);
    this.clockTokens = $state(GameModel.makeClockTokens(clockTokens ?? 5));
    this.fuseTokens = $state(GameModel.makeFuseTokens(fuseTokens ?? 3));
    this.played = $state(played ?? []);

    for (let i = 0; i < this.deck.length; i++) {
      const cardIndex = this.deck[i];
      this.cards[cardIndex].moveToDeck(i);
    }

    this.cheat = $derived.by(() => {
      const record: Record<string, unknown>[] = [];

      for (const card of this.cards) {
        const inPlay = this.played.indexOf(card.index);
        const inDeck = this.deck.indexOf(card.index);
        const inDiscard = this.discard.indexOf(card.index);
        const { hand, handPosition } = this.getHandPosition(card);
        const places = [
          inPlay === -1 ? null : `played${inPlay}`,
          inDeck === -1 ? null : `deck${inDeck}`,
          inDiscard === -1 ? null : `discard${inDiscard}`,
          hand === null ? null : `hand${hand}${handPosition}`,
        ].filter(Boolean);

        record[card.index] = {
          index: card.index,
          color: card.color,
          pips: card.pips,
          places,
        };
      }

      return record;
    });
  }

  revert(_: unknown) {}

  async execute(runner: (game: GameModel) => GameRunnerSteps) {
    const state = {};
    const steps = runner(this);

    for (const step of steps ?? []) {
      const { error } = await step();

      if (error) {
        this.revert(state);
        break;
      }
    }
  }

  async playOrDiscard(card: CardModel) {
    if (this.isCardPlayable(card)) {
      this.played.push(card.index);
      card.moveToPlayed();
      await delay();
      return;
    }

    this.discard.push(card.index);
    card.moveToDiscard(this.discard.length);
  }

  setupTopDeckCard(card: CardModel) {
    card.onClick = async () => {
      card.onClick = undefined;
      this.deck.pop();
      const nextCard = this.getDeckCard(-1);
      if (nextCard) this.setupTopDeckCard(nextCard);
      await this.playOrDiscard(card);
    };
  }

  setupTopDiscardCard(card: CardModel) {
    card.onClick = () => {
      console.log("clicks discard");
    };
  }

  getHandCard(handIndex: number, handPosition: number, pop?: "pop") {
    const cardIndex = this.hands[handIndex]?.[handPosition] ?? -1;

    if (pop) {
      this.hands[handIndex].splice(handPosition, 1);
    }

    const card = this.cards[cardIndex];

    return card ? card : null;
  }

  getHandPosition(card: CardModel) {
    for (let i = 0; i < this.hands.length; i++) {
      for (let j = 0; j < this.hands[i].length; j++) {
        if (this.hands[i][j] === card.index) {
          return {
            hand: i,
            handPosition: j,
          };
        }
      }
    }

    return {
      hand: null,
      handPosition: null,
    };
  }

  getDeckCard(deckPosition: number, pop?: "pop") {
    const deckIndex =
      deckPosition >= 0 ? deckPosition : this.deck.length + deckPosition;
    const cardIndex = this.deck[deckIndex] ?? -1;

    if (pop) {
      this.deck.splice(deckPosition, 1);
    }

    const card = this.cards[cardIndex];

    return card ? card : null;
  }

  getDiscardCard(discardPosition: number, pop?: "pop") {
    const discardIndex =
      discardPosition >= 0
        ? discardPosition
        : this.discard.length + discardPosition;
    const cardIndex = this.discard[discardIndex] ?? -1;

    if (pop) {
      this.discard.splice(discardPosition, 1);
    }

    const card = this.cards[cardIndex];

    return card ? card : null;
  }

  isCardPlayable(card: CardModel) {
    let oneLessPipsCard: CardModel | null = null;
    let sameCard: CardModel | null = null;

    for (const i of this.played) {
      const otherCard = this.cards[i];
      if (card.color !== otherCard?.color) continue;
      if (card.pips === otherCard?.pips) sameCard = otherCard;
      if (card.pips === otherCard?.pips + 1) oneLessPipsCard = otherCard;
    }

    if (card.pips === 1) {
      return Boolean(!sameCard);
    }

    return Boolean(!sameCard && oneLessPipsCard);
  }

  getHandVisualIndex(handIndex: number) {
    if (handIndex === this.thisPlayerIndex) {
      return -1;
    }

    return (handIndex - this.thisPlayerIndex).mod(this.playerCount) - 1;
  }

  onClick = async () => {};
}
