<script lang="ts">
import Scene from "../components/Scene.svelte";
import View from "../components/View.svelte";
import Card from "../components/Card.svelte";
import Controller from "../components/Controller.svelte";
import GameModel from "../model/GameModel.svelte";
import Token from "../components/Token.svelte";
import deal from "../model/runners/deal";
import Controls from "../components/Controls.svelte";

// const game = new GameModel({ playerCount: 5, thisPlayerIndex: 0 });
const game = new GameModel({ playerCount: 5 });
// game.execute(debugDeal);
game.execute(deal);

// $inspect(game);
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
        <Controller matrix={matrix}>
          <Controls items={items} isThisPlayer={playerIndex === game.thisPlayerIndex} />
        </Controller>
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
