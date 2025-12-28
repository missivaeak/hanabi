<script lang="ts">
import type { ControlsItem } from "../model/ControlsModel.svelte";

type Props = {
  items: ControlsItem[];
  isThisPlayer: boolean;
  matrix: DOMMatrix;
};

const { isThisPlayer, items, matrix }: Props = $props();
</script>

<aside class={`controls`} style:transform={matrix.toCSS()}>
  {#each items as { onClick, text, icon }}
    <button class={`controls__button ${isThisPlayer ? 'controls__button--this' : 'controls__button--other'}`} onclick={onClick}>
      <!-- <p>{icon}</p> -->
      <p>{text}</p>
    </button>
  {/each}
</aside>

<style>
.controls {
  grid-column: 1;
  grid-row: 1;
  transition: transform 0.1s ease;
  pointer-events:none;
  display: flex;
  gap: 10px;
}

.controls__button {
  aspect-ratio: 1 / 1;
  width: 75px;
  background: #fff3;
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: none;
  transition: scale 0.1s ease;
  pointer-events: auto;
  position: relative;
}

.controls__button--this {
  width: 50px;
  font-size: 12px;
}

.controls__button:hover {
  scale: 1.5;
  z-index: 1;
}

@property --gradient-rotation {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}

.controls__button::before {
  --base-color: oklch(80% 0.19 0);
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0px;

  border-radius: inherit;
  /* this is the border width */
  padding: 2px;
  background: conic-gradient(
    from var(--gradient-rotation) in oklch longer hue,
    oklch(from var(--base-color) l c 0),
    oklch(from var(--base-color) l c 180),
    oklch(from var(--base-color) l c 360)
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: rotate-gradient 2s infinite linear paused;
}

.controls__button:hover::before {
  animation-play-state: running;
}

@keyframes rotate-gradient {
  from {
    --gradient-rotation: 0deg;
  }
  to {
    --gradient-rotation: 360deg;
  }
}

</style>
