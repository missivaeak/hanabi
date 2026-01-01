export type ControlsItem = {
  key: string;
  onClick: () => void | Promise<void>;
  icon?: string;
  text: string;
};

export default class ControlsModel {
  items: ControlsItem[];
  matrix: DOMMatrix;
  tabindexBasis: number;

  constructor() {
    this.items = $state([]);
    this.matrix = $state(new DOMMatrix());
    this.tabindexBasis = $state(-1);
  }

  moveToBasePosition(visualIndex: number, playerCount: number) {
    this.tabindexBasis = visualIndex + 1;

    if (visualIndex === -1) {
      this.matrix = new DOMMatrix([
        0.8632376409818908, -0.4804404544040771, -0.15491205558001012, 0,
        0.45818199103466434, 0.8745182355490728, -0.1590192402938946, 0,
        0.2118726935769002, 0.06629347980111241, 0.975046222623486, 0,
        59.916569118922624, 61.324741647903835, -897.258073160357, 1,
      ]);
      return;
    }

    const degrees = 180 * ((visualIndex + 1) / playerCount) - 90;
    const radius = 590;

    this.matrix = new DOMMatrix()
      .translate(0, 0, 300)
      .rotate(-90, 0, degrees)
      .translate(0, 0, -radius);
  }

  moveToAboveCard(cardMatrix: DOMMatrix) {
    this.matrix = cardMatrix.copy().rotate(180, 0, 180).translate(0, -160, 0);
  }
}
