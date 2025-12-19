import { colors, type Color } from "@repo/shared";
import { mod } from "../utils";

const handOffsetTransforms = [
  new DOMMatrix().translate(0, 5, 0).rotate(8, 8, -9),
  new DOMMatrix().translate(0, -5, 0).rotate(8, 8, -3),
  new DOMMatrix().translate(0, -5, 0).rotate(8, 8, 3),
  new DOMMatrix().translate(0, 5, 0).rotate(8, 8, 9),
];

const DECK_TABINDEX = 1;
const DISCARD_TABINDEX = 2;
const PLAYER_HAND_TABINDICES = [6, 5, 4, 3];
const OTHERS_HAND_TABINDEX_START = 7;

export default class CardModel {
  pips: number;
  color: Color;
  tabindex = $state(-1);
  matrix = $state(new DOMMatrix());

  constructor(color: Color, pips: number) {
    this.pips = pips;
    this.color = color;
  }

  async delay() {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  setDeckPosition(deckPosition: number) {
    this.matrix = new DOMMatrix()
      .rotate(0, 180, 0)
      .translate(90, -380, -deckPosition);
    this.tabindex = DECK_TABINDEX;
  }

  async setDiscardPosition(discardPosition: number) {
    this.matrix = new DOMMatrix()
      .rotate(180, 180, 0)
      .translate(-90, 380, discardPosition);
    this.tabindex = DISCARD_TABINDEX;

    await this.delay();
  }

  async play() {
    const colorOffset = 180;
    const xOffset = colors.indexOf(this.color) * colorOffset;
    const pipOffset = this.pips * 50;

    this.matrix = new DOMMatrix().translate(
      xOffset - (colorOffset * (colors.length - 1)) / 2,
      pipOffset - 180,
      0,
    );
    this.tabindex = -1;
  }

  async setPlayerHandPosition(handPosition: number) {
    const handOffsetAngles = [-15, -5, 5, 15];
    const offsetTransform = handOffsetTransforms[handPosition];
    const offsetRotation = handOffsetAngles[handPosition];
    const degrees = 180 + offsetRotation;
    const radius = 650;

    this.matrix = new DOMMatrix()
      .translate(0, 0, 122)
      .rotate(-90, 0, degrees)
      .translate(0, 0, -radius)
      .rotate(0, 6, 0)
      .multiply(offsetTransform);

    this.tabindex = PLAYER_HAND_TABINDICES[handPosition];

    await this.delay();
  }

  async setOtherHandPosition(
    handPosition: number,
    hand: number,
    playerCount: number,
  ) {
    const handOffsetAngles = [-9, -3, 3, 9];
    const offsetTransform = handOffsetTransforms[handPosition];
    const offsetRotation = handOffsetAngles[handPosition];
    const otherHandsCount = playerCount - 1;
    const degrees = 180 * ((hand + 1) / playerCount) - 90 + offsetRotation;
    const radius = 590;

    this.matrix = new DOMMatrix()
      .translate(0, 0, 150)
      .rotate(-90, 0, degrees)
      .translate(0, 0, -radius)
      .multiply(offsetTransform);
    this.tabindex =
      OTHERS_HAND_TABINDEX_START + hand * otherHandsCount + handPosition;

    await this.delay();
  }

  onClick: (() => void) | undefined = $state(undefined);
}
