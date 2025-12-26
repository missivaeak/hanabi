<script lang="ts">
import { type Snippet } from "svelte";

type Props = { children?: Snippet };

const { children }: Props = $props();
</script>

<div class="scene">
  {@render children?.()}
</div>

<style>
.scene {
  --scene-size: 1200px;
  --scene-scale: 0.98;
  display: grid;
  place-items: center;
  position: absolute;
  background: light-dark(burlywood, oklch(0.37 0.12 24.76));
  border: solid 3px light-dark(brown, black);
  width: var(--scene-size);
  aspect-ratio: 1/1;
  border-radius: 50%;
  transform: rotate3d(1, 0, 0, 75deg) scale3d(var(--scene-scale), var(--scene-scale), var(--scene-scale)) translate3d(0, 0, -140px);
  scale: min(1, calc(var(--view-width) / var(--scene-size)));
}

.scene, .scene :global(*) {
  transform-style: preserve-3d;
}

.scene::before {
  content: '';
  background: light-dark(oklch(from saddlebrown calc(l - 0.2) c h), oklch(0.42 0.02 16.5));
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  translate: 0 0 -20px;
}
</style>
