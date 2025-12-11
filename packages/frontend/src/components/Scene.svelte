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
  --scene-width: 1800px;
  --scene-height: 1800px;
  display: grid;
  place-items: center;
  transform-style: preserve-3d;
  position: relative;
  background: burlywood;
  border: solid 3px brown;
  width: var(--scene-width);
  height: var(--scene-height);
  left: calc(50% - var(--scene-width) / 2);
  top: calc(60% - var(--scene-height) / 2);
  border-radius: 50%;
  /* animation: spin 10s linear infinite; */
}

.scene::before {
  content: '';
  background: oklch(from saddlebrown calc(l - 0.2) c h);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  translate: 0 0 -20px;
}

@keyframes spin {
  from {
    transform: rotate3d(1, 0, 0, 70deg) rotate3d(0, 0, 1, 0deg);
  }
  to {
    transform: rotate3d(1, 0, 0, 70deg) rotate3d(0, 0, 1, 360deg);
  }
}
</style>
