<script>
  import Router from "svelte-spa-router";
  import NotFound from "./routes/NotFound.svelte";
  import Waiting from "./routes/Waiting.svelte";
  import Sell from "./routes/Sell.svelte";

  const routes = {
    "/": Waiting,
    "/sell": Sell,
    "*": NotFound,
  };
</script>

<main>
  <Router {routes} />
</main>
