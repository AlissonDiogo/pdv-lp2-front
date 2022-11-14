<script>
  import Router from "svelte-spa-router";
  import NotFound from "./routes/NotFound.svelte";
  import Waiting from "./routes/Waiting.svelte";
  import ScannerISBN from "./routes/ScannerISBN.svelte";
  import Sell from "./routes/Sell.svelte";

  const routes = {
    "/": Waiting,
    "/scan": ScannerISBN,
    "/sell": Sell,
    "*": NotFound
  }
</script>

<main>
  <Router {routes}/>
</main>
