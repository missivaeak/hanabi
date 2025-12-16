<script lang="ts">
import { type Color } from "@repo/shared";

type Props = {
  color: Color;
  pips: number;
};

let { color, pips }: Props = $props();
</script>

<div class={`card card--color-${color} card--count-${pips}`} >
  {#each { length: pips }, pip}
    <div class="card__pip-wrapper">
      <div class={`card__pip card__pip--color-${color}`}></div>
    </div>
  {/each}
  <span class="card__number">{pips}</span>
  <span class="card__number">{pips}</span>
  <div class="card__back">
    <span class="card__back-text">hanabi</span>
  </div>
</div>

<style>
.card {
  --border-radius: 7%;
  --border-width: 5px;
  --start-color: 20;
  --color-rotation: calc(360 / 5);
  --card-width: calc(var(--scene-size) / 8);
  --shadow-size: calc(var(--card-width) / 7);
  --pip-color: oklch(from var(--card-color) calc(l - 0.2) c h);

  background: var(--card-color);
  width: var(--card-width);
  aspect-ratio: 1 / sqrt(2);
  border-radius: calc(var(--border-radius) * sqrt(2)) / var(--border-radius);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  padding: calc(var(--card-width) / 8) calc(var(--card-width) / 8 * sqrt(2));
  position: relative;
  grid-row: 1;
  grid-column: 1;

  box-shadow:
    inset var(--shadow-size) calc(var(--shadow-size) * -1) var(--shadow-size) #00000015,
    inset calc(var(--shadow-size) * -1) var(--shadow-size) var(--shadow-size) #FFFFFF33;
}

.card, .card__back {
  outline: solid 4px light-dark(oklch(from var(--theme-color) calc(l - 0.4) c h), oklch(from var(--theme-color) calc(l - 0.55) c h));
}

.card__back {
  --color-1: light-dark(oklch(from var(--theme-color) calc(l + 0.1) c h), oklch(from var(--theme-color) calc(l - 0.1) c h));
  --color-2: light-dark(oklch(from var(--accent-color) calc(l + 0.1) c h), oklch(from var(--accent-color) calc(l - 0.1) c h));
  background: linear-gradient(40deg, var(--color-1), var(--color-2));
  /* background: linear-gradient(40deg, oklch(88% 0.05 212), oklch(88% 0.05 160)); */
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: calc(var(--border-radius) * sqrt(2)) / var(--border-radius);
  translate: 0 0 -1px;
  rotate: y 180deg;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: calc(var(--card-width) * (sqrt(2) - 1));
}

.card__back-text {
  font-weight: 600;
  font-size: 2em;
  color: #333;
  border-top: solid 2px black;
  border-bottom: solid 2px black;
  scale: calc(var(--scene-size) / 1500px);
  pointer-events: none;
  user-select: none;
}

.card__number {
  --card-number-size: 50px;
  position: absolute;
  font-size: 2em;
  font-weight: 800;
  color: var(--pip-color);
  height: var(--card-number-size);
  line-height: var(--card-number-size);
  aspect-ratio: 1/1;
  pointer-events: none;
  user-select: none;
}

.card__number:nth-of-type(1) {
  top: 0;
  left: 0;
}

.card__number:nth-of-type(2) {
  bottom: 0;
  right: 0;
  rotate: 180deg;
}

.card--color-a {
  --card-color: oklch(80% 0.19 var(--start-color));
}

.card--color-b {
  --card-color: oklch(80% 0.19 calc(var(--start-color) + var(--color-rotation)));
}

.card--color-c {
  --card-color: oklch(80% 0.19 calc(var(--start-color) + var(--color-rotation) * 2));
}

.card--color-d {
  --card-color: oklch(80% 0.19 calc(var(--start-color) + var(--color-rotation) * 3));
}

.card--color-e {
  --card-color: oklch(80% 0.19 calc(var(--start-color) + var(--color-rotation) * 4));
}

.card__pip-wrapper {
  width: 50%;
  display: grid;
  place-items: center;
}

.card--count-2 > .card__pip-wrapper,
.card--count-3 > .card__pip-wrapper,
.card--count-5 > .card__pip-wrapper:nth-child(3),
.card--count-7 > .card__pip-wrapper:nth-child(3),
.card--count-9 > .card__pip-wrapper:nth-child(5) {
  width: 100%;
}

.card__pip {
  background: var(--pip-color);
  width: calc(var(--card-width) / 6);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

</style>
