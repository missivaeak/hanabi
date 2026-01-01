<script lang="ts">
import Scene from "../components/Scene.svelte";
import View from "../components/View.svelte";
import Card from "../components/Card.svelte";
import Controller from "../components/Controller.svelte";
import GameModel from "../model/GameModel.svelte";
import Token from "../components/Token.svelte";
import deal from "../model/runners/deal.svelte";
import Controls from "../components/Controls.svelte";
import Explosion from "../components/Explosion.svelte";
import { SvelteSet } from "svelte/reactivity";
import type { UiSignal } from "../types/UiSignal";
import knowledgeStore from "../store/knowledgeStore.svelte";
import Knowledge from "../components/Knowledge.svelte";
import { range } from '../utils/index.ts';

const game = new GameModel({ playerCount: 5, thisPlayerIndex: 0 });
knowledgeStore.set(range(game.cards.length).map(_ => ({
  color: {
    a: true,
    b: true,
    c: true,
    d: true,
    e: true,
  },
  pips: {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  },
})));
// const game = new GameModel({ playerCount: 5 });
let explosions = new SvelteSet<UiSignal<"explosion">>();
let toasts = new SvelteSet<UiSignal<"toast">>();

game.signal = (uiSignal) => {
  switch (uiSignal.type) {
    case "toast":
      toasts.add(uiSignal);
      setTimeout(() => {
        toasts.delete(uiSignal);
      }, 5000);
      break;
    case "explosion":
      explosions.add(uiSignal);
      setTimeout(() => {
        explosions.delete(uiSignal);
      }, 1000);
      break;
    default:
      console.error("Unknown UI Signal type");
  }
};

// game.execute(debugDeal);
game.execute(deal);

// $inspect(game);
</script>

<!-- <button onclick={game.onClick}>up</button> -->
<main class="game">
  <View>
    <Scene>
      {#each game.cards as { color, pips, onClick, matrix, tabindex, index }}
        <Controller matrix={matrix} onclick={onClick} tabindex={tabindex}>
          <Card color={color} pips={pips} />
          {#if game.isInThisPlayerHand(index)}
            <Knowledge index={index} interactable={true} position={"thisPlayer"} />
          {/if}
        </Controller>
      {/each}
      {#each game.clockTokens as { matrix, onClick, tabindex, type }}
        <Controller matrix={matrix} onclick={onClick} tabindex={tabindex}>
          <Token type={type} />
        </Controller>
      {/each}
      {#each game.fuseTokens as { matrix, onClick, tabindex, type }}
        <Controller matrix={matrix} onclick={onClick} tabindex={tabindex}>
          <Token type={type} />
        </Controller>
      {/each}
      {#each game.controls as { items, matrix }, playerIndex}
          <Controls matrix={matrix} items={items} isThisPlayer={playerIndex === game.thisPlayerIndex} />
      {/each}
      {#each explosions as { matrix }}
        <Explosion matrix={matrix} />
      {/each}
    </Scene>
  </View>
</main>

<!-- <CheatingTable game={game} /> -->

<style>
.game {
  flex-grow: 1;
  display: grid;
  place-items: center;
}
</style>
