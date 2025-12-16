<script lang="ts">
import { Link } from "svelte5-router";
</script>

<main class="landing">
  <Link to="game">Play</Link>
</main>

<style>
.landing {
  flex-grow: 1;
  display: grid;
  place-items: center;
}
</style>
