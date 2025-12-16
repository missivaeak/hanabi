<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
  children: Snippet;
};

let { children }: Props = $props();
</script>

<div class="view">
  {@render children?.()}
</div>

<style>
.view {
  --view-width: min(calc(100dvh * (16/9)), 100dvw);
  width: var(--view-width);
  /* aspect-ratio: sqrt(2) / 1; */
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 50% 150%, light-dark(#000000cc, #ffffff33), transparent 80%);
}

.view, .view :global(*) {
  perspective: 4000px;
}
</style>
