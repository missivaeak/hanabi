<script lang="ts">
import Scene from "../components/Scene.svelte";
import View from "../components/View.svelte";
import Card from "../components/Card.svelte";
import Controller from "../components/Controller.svelte";
import GameModel from "../model/GameModel.svelte";
import type { Attachment } from "svelte/attachments";
import Token from "../components/Token.svelte";
import deal from "../model/runners/deal";

const game = new GameModel({ playerCount: 5 });
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
    </Scene>
  </View>
<!-- <table><tbody> -->
<!--   {#each {length: 5}, i} -->
<!--     <tr> -->
<!--       {#each {length: 10}, j} -->
<!--         {@const cheat = game.cheat[i * 10 + j]} -->
<!--         <td>  -->
<!--           {cheat.index}{cheat.color}{cheat.pips}<br> -->
<!--           {JSON.stringify(cheat.places)} -->
<!--         </td> -->
<!--       {/each} -->
<!--     </tr> -->
<!--   {/each} -->
<!-- </tbody></table> -->
</main>

<style>
.game {
  flex-grow: 1;
  display: grid;
  place-items: center;
}
</style>
