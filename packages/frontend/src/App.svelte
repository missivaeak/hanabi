<script>
import { Router, Link, Route } from "svelte5-router";
import Landing from "./views/Landing.svelte";
import LightDarkToggle from "./components/LightDarkToggle.svelte";
let url = "";
</script>

<Router {url}>
  <h1>hanabi</h1>
  <LightDarkToggle />
  <Route path="/"><Landing /></Route>
</Router>
