<script lang="ts">
import Scene from "../components/Scene.svelte";
import View from "../components/View.svelte";
import Card from "../components/Card.svelte";
import Controller from "../components/Controller.svelte";
import GameModel from "../model/GameModel.svelte";
import type { Attachment } from "svelte/attachments";
import ClockToken from "../components/ClockToken.svelte";

const game = new GameModel();
game.deal();
</script>

<!-- <button onclick={game.onClick}>up</button> -->
<main class="game">
  <View>
    <Scene>
      {#each game.cards as { color, pips, onClick, matrix, tabindex }}
        <Controller matrix={matrix} onclick={onClick} tabindex={tabindex}>
          <Card color={color} pips={pips} />
        </Controller>
      {/each}
      {#each {length: 3}, i}
        <ClockToken index={i} />
      {/each}
    </Scene>
  </View>
</main>

<style>
.game {
  flex-grow: 1;
  display: grid;
  place-items: center;
}
</style>
