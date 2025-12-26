export type ControlsItem = {
  key: string;
  onClick: () => void | Promise<void>;
  icon?: string;
  text?: string;
};

export default class ControlsModel {
  items: ControlsItem[];
  matrix: DOMMatrix;

  constructor() {
    this.items = $state([]);
    this.matrix = $state(new DOMMatrix());
  }

  moveToBasePosition(visualIndex: number, playerCount: number) {
    if (visualIndex === -1) {
      this.matrix = new DOMMatrix()
        .rotate(-90, 0, 0)
        .translate(-320, -200, 950);
      return;
    }

    const degrees = 180 * ((visualIndex + 1) / playerCount) - 90;
    const radius = 590;

    this.matrix = new DOMMatrix()
      .translate(0, 0, 300)
      .rotate(-90, 0, degrees)
      .translate(0, 0, -radius);
  }
}
