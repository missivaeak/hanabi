<script lang="ts">
import type { ControlsItem } from "../model/ControlsModel.svelte";

type Props = {
  items: ControlsItem[];
  isThisPlayer: boolean;
};

const { isThisPlayer, items }: Props = $props();
</script>

{#if isThisPlayer}
  <aside class="controls controls--this">
    {#each items as { onClick, text, icon }}
      <button onclick={onClick}>
        {text} {icon}
      </button>
    {/each}
  </aside>
{:else}
  <aside class="controls controls--other">
    {#each items as { onClick, text, icon }}
      <button onclick={onClick}>
        {text} {icon}
      </button>
    {/each}
  </aside>
{/if}

<style>
.controls {
  padding: 20px;
  background: #fff3;
  backdrop-filter: blur(10px);
  border-radius: 20px;
}
</style>
