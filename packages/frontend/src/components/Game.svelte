<script lang="ts">
import Scene from "../components/Scene.svelte";
import View from "../components/View.svelte";
import { colors } from "@repo/shared";
import { type CardState, type ControllerLocation } from "../types/";
import Card from "./Card.svelte";
import Controller from "./Controller.svelte";

const distribution = [3, 2, 2, 2, 1];
let deck = $state(
  colors.reduce<CardState[]>(
    (acc, color) =>
      acc.concat(
        distribution.reduce<CardState[]>((acc, amount, i) => {
          const pips = i + 1;
          const cardState = { color, pips };
          const cardStates = Array(amount).fill(cardState);
          return acc.concat(cardStates);
        }, []),
      ),
    [],
  ),
);

let handCount = 5;
let hand = $state(1);
let location: ControllerLocation = $state("deck");
</script>

<button onclick={() => (location = "hand")}>up</button>
<View>
  <Scene>
    <Controller index={50} location={location} hand={hand} handCount={handCount}>
      <Card color="a" pips={4} />
    </Controller>

    {#each deck as { color, pips }, i}
      <Controller index={i} location="deck" handCount={handCount} hand={-1}>
        <Card color={color} pips={pips} />
      </Controller>
    {/each}
  </Scene>
</View>

