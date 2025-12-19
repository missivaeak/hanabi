export default class TokenModel {
  matrix: DOMMatrix;
  type: string;
  tabindex: number;
  onClick: (() => void) | undefined;

  constructor(type: string) {
    this.matrix = $state(new DOMMatrix());
    this.type = $state(type);
    this.tabindex = $state(-1);
    this.onClick = $state(undefined);
  }

  setFusePosition(position: number) {
    const offsets = [
      new DOMMatrix().translate(27, -18, 0),
      new DOMMatrix().translate(-7, 37, 0),
      new DOMMatrix().translate(-30, -27, 0),
      new DOMMatrix().translate(55, 65, 0),
      new DOMMatrix().translate(95, 10, 0),
      new DOMMatrix().translate(130, 75, 0),
      new DOMMatrix().translate(80, -65, 0),
      new DOMMatrix().translate(10, -90, 0),
    ];

    this.matrix = new DOMMatrix()
      .translate(-270, -330, 20)
      .multiply(offsets[position]);
  }

  setClockPosition(position: number) {
    const offsets = [
      new DOMMatrix().translate(27, -18, 0),
      new DOMMatrix().translate(-7, 37, 0),
      new DOMMatrix().translate(-30, -27, 0),
      new DOMMatrix().translate(55, 65, 0),
      new DOMMatrix().translate(95, 10, 0),
      new DOMMatrix().translate(130, 75, 0),
      new DOMMatrix().translate(80, -65, 0),
      new DOMMatrix().translate(10, -90, 0),
    ];
    this.matrix = new DOMMatrix()
      .translate(230, -350, 20)
      .multiply(offsets[position]);
  }
}
