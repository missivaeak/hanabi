<script lang="ts">
import type GameModel from "../model/GameModel.svelte";

type Props = {
  game: GameModel;
};

const { game }: Props = $props();
</script>

<table class="cheating-table">
  <tbody>
    {#each {length: 5}, i}
      <tr>
        {#each {length: 10}, j}
          {@const cheat = game.cheat[i * 10 + j]}
          <td> 
            {cheat.index}{cheat.color}{cheat.pips}<br>
            {JSON.stringify(cheat.places)}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
.cheating-table {
  position: absolute;
  bottom: 0;
  left: 50%;
  translate: -50%;
}
</style>
