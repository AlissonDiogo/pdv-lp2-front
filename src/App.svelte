<script>
  import Router from "svelte-spa-router";
  import NotFound from "./routes/NotFound.svelte";
  import Waiting from "./routes/Waiting.svelte";
  import Sell from "./routes/Sell.svelte";
  import SignIn from "./routes/SignIn.svelte";

  const routes = {
    "/": Waiting,
    "/sell": Sell,
    "/sign-in": SignIn,
    "*": NotFound,
  };
</script>

<main>
  <Router {routes} />
</main>
