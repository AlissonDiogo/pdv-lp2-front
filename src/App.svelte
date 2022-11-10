<script>
  import Router from "svelte-spa-router";
  import NotFound from "./routes/NotFound.svelte";
  import Waiting from "./routes/Waiting.svelte";

  const routes = {
    "/": Waiting,
    "*": NotFound
  }
</script>

<main>
  <Router {routes}/>
</main>