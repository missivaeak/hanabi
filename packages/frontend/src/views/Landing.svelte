<script lang="ts">
import { Link } from "svelte5-router";
</script>

<main class="landing">
  <Link class="landing__link" to="game">Play</Link>
</main>

<style>
.landing {
  flex-grow: 1;
  display: grid;
  place-items: center;
  font-size: 2em;
}
</style>
