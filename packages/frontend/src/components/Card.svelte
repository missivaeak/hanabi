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
  --border-color: oklch(from var(--card-color) calc(l - 0.2) c h);
  --card-width: 200px;
  --shadow-size: calc(var(--card-width) / 7);

  background: var(--card-color);
  border: solid var(--border-width) var(--border-color);
  width: var(--card-width);
  aspect-ratio: 1 / sqrt(2);
  border-radius: calc(var(--border-radius) * sqrt(2)) / var(--border-radius);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  padding: calc(var(--card-width) / 10) calc(var(--card-width) / 10 * sqrt(2));
  position: relative;
  grid-row: 1;
  grid-column: 1;

  box-shadow:
    inset var(--shadow-size) calc(var(--shadow-size) * -1) var(--shadow-size) #00000015,
    inset calc(var(--shadow-size) * -1) var(--shadow-size) var(--shadow-size) #FFFFFF33;
}

.card, .card * {
  transform-style: preserve-3d;
}

.card, .card__back {
  outline: solid 1px black;
}

.card__back {
  content: 'hanabi';
  /* background: oklch(88% 0.05 212); */
  background: linear-gradient(40deg, oklch(88% 0.05 212), oklch(88% 0.05 160));
  position: absolute;
  width: calc(100% + var(--border-width) * 2);
  height: calc(100% + var(--border-width) * 2);
  border-radius: calc(var(--border-radius) * sqrt(2)) / var(--border-radius);
  border: solid 5px #000000;
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
  border-top: solid 2px black;
  border-bottom: solid 2px black;
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
  background: var(--border-color);
  width: calc(var(--card-width) / 6);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

</style>
