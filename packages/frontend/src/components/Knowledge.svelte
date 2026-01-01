<script lang="ts">
import { colors, pipCounts, type Color, type PipCount } from "@repo/shared";
import type { CardKnowledge } from "../model/CardModel.svelte";
import knowledgeStore from '../store/knowledgeStore.svelte';

const positions = ["thisPlayer"] as const;
type Position = (typeof positions)[number];

type Props = {
  index: number;
  interactable?: boolean;
  position?: Position;
};
const { index, interactable, position }: Props = $props();

const positionMatrixMap: {[K in Position]: DOMMatrix} = {
  thisPlayer: new DOMMatrix().rotate(0, 180, 0),
};
const matrix = position ? positionMatrixMap[position] : null;

let knowledge;
knowledgeStore.subscribe((value) => knowledge = value[index]);
</script>

{#snippet pipsIconNonInteractable(pips: number, available: boolean)}
    <div class={`knowledge_icon ${available ? '' : 'knowledge__icon--crossed'} knowledge__icon--pips`}>{pips}</div>
{/snippet}

{#snippet pipsIconInteractable(pips: number, available: boolean)}
    <button class={`knowledge_icon ${available ? '' : 'knowledge__icon--crossed'} knowledge__icon--pips`}>{pips}</button>
{/snippet}

{#snippet pipsIcon(pips: number, available: boolean)}
  {#if interactable}
    {@render pipsIconInteractable(pips, available)}
  {:else}
    {@render pipsIconNonInteractable(pips, available)}
  {/if}
{/snippet}


<div class="knowledge" style:transform={matrix?.toCSS()}>
  {#each pipCounts as pips}
    {@render pipsIcon(pips, knowledge?.pips[pips])}
  {/each}
  {#each pipCounts as pips}
    {@render pipsIcon(pips, knowledge?.pips[pips])}
  {/each}
</div>

<style>
.knowledge {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.knowledge_icon {
  background-color: aliceblue;
  width: 25px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: block;
}
</style>
