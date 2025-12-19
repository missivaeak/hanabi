<script lang="ts">
import Scene from "../components/Scene.svelte";
import View from "../components/View.svelte";
import Card from "../components/Card.svelte";
import Controller from "../components/Controller.svelte";
import GameModel from "../model/GameModel.svelte";
import type { Attachment } from "svelte/attachments";
import Token from "../components/Token.svelte";

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
      {#each game.clockTokens as {matrix, onClick, tabindex, type}}
        <Controller matrix={matrix} onclick={onClick} tabindex={tabindex}>
          <Token type={type} />
        </Controller>
      {/each}
      {#each game.fuseTokens as {matrix, onClick, tabindex, type}}
        <Controller matrix={matrix} onclick={onClick} tabindex={tabindex}>
        <Token type={type} />
        </Controller>
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
