<script lang="ts">
import { colors, pipCounts, type Color, type PipCount } from "@repo/shared";
import type { CardKnowledge } from "../model/CardModel.svelte";

type Props = {
  knowledge: CardKnowledge;
  interactable?: boolean;
};

const { knowledge, interactable }: Props = $props();
</script>

{#snippet pipsIcon(pips: number, available: boolean)}
    <div class={`knowledge_icon ${available ? '' : ''} knowledge__icon--pips`}>{pips}</div>
{/snippet}

{#snippet pipsIconInteractable(pips: number, available: boolean)}
    <button class={`knowledge_icon knowledge__icon--pips`}>{pips}</button>
{/snippet}

<div class="knowledge">
  {#each pipCounts as pips}
    <div class={`knowledge_icon knowledge__icon--pips`}>{pips}</div>
  {/each}
  {#each colors as color}
    <div class={`knowledge_icon knowledge__icon--color`}></div>
  {/each}
</div>

<style>
.knowledge_icon {
  background-color: aliceblue;
  width: 25px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

}
</style>
