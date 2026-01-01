<script>
import { Router, Route } from "svelte5-router";
import Landing from "./views/Landing.svelte";
import LightDarkToggle from "./components/LightDarkToggle.svelte";
import Game from "./views/Game.svelte";
import Header from "./components/Header.svelte";
let url = "";
</script>

<Router {url}>
  <Route path="/"><Landing /></Route>
  <Route path="/game"><Game /></Route>
  <Header />
  <LightDarkToggle />
</Router>
