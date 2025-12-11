<script lang="ts">
import { type Snippet } from "svelte";
import type { ControllerLocation } from "../types";
import { mod } from "../utils";

type Props = {
  index: number;
  children: Snippet;
  location: ControllerLocation;
  hand: number;
  handCount: number;
};

let { children, index, location, hand, handCount }: Props = $props();
let style = $state(`transform: translate3d(0, 0, ${index + 1}px)`);

let step = -1;
const steps = [
  `transform: translate3d(0, 0, ${index + 1}px)`,
  `transform: translate3d(0, 0, ${index + 200}px) rotate3d(1, 0, 0, -90deg)`,
  `transform: translate3d(0, 150px, ${index + 150}px)`,
];

function onClick() {
  step++;

  style = steps[mod(step, steps.length)];
}
</script>

<!-- <div class="controller" style={style} onclick={onClick} onkeypress={() => {}} role="button" tabindex="0"> -->
<div class="controller" style={style} onclick={onClick}>
  {@render children?.()}
</div>

<style>
.controller {
  transform-style: preserve-3d;
  grid-column: 1;
  grid-row: 1;
  transition: transform 0.4s ease;
}
</style>
