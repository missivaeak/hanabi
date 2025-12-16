<script lang="ts">
import { type Snippet } from "svelte";
import type { MouseEventHandler } from "svelte/elements";

type Props = {
  children: Snippet;
  matrix?: DOMMatrix;
  // onclick?: MouseEventHandler<HTMLButtonElement>;
  onclick?: () => void;
  tabindex?: number;
};

let { children, matrix, onclick, tabindex }: Props = $props();
</script>

<button class="controller" style:transform={matrix?.toCSS()} onclick={onclick} onkeypress={onclick} tabindex={tabindex}>
  <div class={onclick ? 'controller__hoverer' : ''}>
    {@render children?.()}
  </div>
</button>

<style>
.controller {
  grid-column: 1;
  grid-row: 1;
  transition: transform 0.4s ease;
  border: none;
  background: none;
}

.controller:focus, .controller:focus-visible {
  border: unset;
  outline: unset;
  background: unset;
  box-shadow: unset;
}

.controller:hover .controller__hoverer,
.controller:focus .controller__hoverer {
  scale: 1.1;
}
</style>
