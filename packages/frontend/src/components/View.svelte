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
  width: min(100vh, 100vw);
  height: calc(min(100vh, 100vw) / sqrt(2));
  position: relative;
  transform-style: preserve-3d;
  overflow: hidden;
  background: aliceblue;
  border: solid 1px cornflowerblue;
}
</style>
