<script lang="ts">
type Props = {
  index: number;
};

const { index } = $props();

const radius = 40;
const angleOffset = -20;
const offsets = [
  new DOMMatrix()
    .rotate(0, 0, 0 + angleOffset)
    .translate(radius, 0, 0)
    .rotate(0, 0, 0 - angleOffset),
  new DOMMatrix()
    .rotate(0, 0, 120 + angleOffset)
    .translate(radius, 0, 0)
    .rotate(0, 0, -120 - angleOffset),
  new DOMMatrix()
    .rotate(0, 0, 240 + angleOffset)
    .translate(radius, 0, 0)
    .rotate(0, 0, -240 - angleOffset),
];

const matrix = new DOMMatrix()
  .translate(230, -350, 20)
  .multiply(offsets[index]);
const thicknessMatrix = new DOMMatrix().rotate(90, 0, 0).translate(0, -10, 0);
const backfaceMatrix = new DOMMatrix().translate(0, 0, -20);
</script>

<div class="clock_token" style:transform={matrix.toCSS()}>
  <div class="clock_token__backface" style:transform={backfaceMatrix.toCSS()}></div>
  <div class="clock_token__thickness" style:transform={thicknessMatrix.toCSS()}></div>
</div>

<style>
.clock_token {
  --token-width: 50px;
  --token-color: cornflowerblue;
  background: var(--token-color);
  grid-row: 1;
  grid-column: 1;
  width: var(--token-width);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: solid 2px black;
}

.clock_token__thickness {
  content: '';
  display: block;
  background: var(--token-color);
  width: var(--token-width);
  height: 20px;
  grid-row: 1;
  grid-column: 1;
  position: relative;
  left: -2px;
  border-left: solid 2px black;
  border-right: solid 2px black;
}

.clock_token__backface {
  content: '';
  display: block;
  grid-row: 1;
  grid-column: 1;
  background: var(--token-color);
  width: 100%;
  height: 100%;
  border-radius:50%;
  border: solid 2px black;
  position: relative;
  left: -2px;
}
</style>
