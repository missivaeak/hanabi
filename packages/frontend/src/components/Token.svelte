<script lang="ts">
type Props = { type: string };
const { type }: Props = $props();

const thicknessMatrix = new DOMMatrix().rotate(90, 0, 0).translate(0, -10, 0);
const backfaceMatrix = new DOMMatrix().translate(0, 0, -20);
</script>

<div class={`token token--${type}`}>
  <div class="token__backface" style:transform={backfaceMatrix.toCSS()}></div>
  <div class="token__thickness" style:transform={thicknessMatrix.toCSS()}></div>
</div>

<style>
.token--clock {
  --token-color: light-dark(oklch(0.75 0.14 260), oklch(0.55 0.14 260));
}

.token--fuse {
  --token-color: light-dark(oklch(0.5 0.05 260), oklch(0.45 0.05 260));
}

.token {
  --token-width: 50px;
  --color-dark: oklch(from var(--token-color) calc(l - 0.1) c h);
  --color-light: oklch(from var(--token-color) calc(l + 0.1) c h);
  
  background: var(--token-color);
  grid-row: 1;
  grid-column: 1;
  width: var(--token-width);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: solid 2px black;
  box-shadow:
    inset 10px -10px 20px var(--color-dark),
    inset -10px 10px 20px var(--color-light);
}

.token__thickness {
  content: '';
  display: block;
  background: var(--token-color);
  background: var(--color-dark);
  width: var(--token-width);
  height: 20px;
  grid-row: 1;
  grid-column: 1;
  position: relative;
  left: -2px;
  border-left: solid 2px black;
  border-right: solid 2px black;
}

.token__backface {
  content: '';
  display: block;
  grid-row: 1;
  grid-column: 1;
  background: var(--token-color);
  background: var(--color-dark);
  width: 100%;
  height: 100%;
  border-radius:50%;
  border: solid 2px black;
  position: relative;
  left: -2px;
}
</style>
