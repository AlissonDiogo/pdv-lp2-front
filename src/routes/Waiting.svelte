<script>
  import { push } from "svelte-spa-router";

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let now = new Date();

  const halfSecondMs = 30000;
  setInterval(() => {
    now = new Date();
  }, halfSecondMs);


  const onKeyDown = () => {
    push("/sell");
  }
</script>

<main>
  <h1>FREE CASHIER</h1>
  <section>
    <h2>{now.getHours()}:{now.getMinutes()}</h2>
    <p>{now.getDay()} {months[now.getMonth()].toUpperCase()} {now.getFullYear()}</p>
  </section>
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }

  section {
    display: grid;
    gap: 1rem;
  }
</style>

<svelte:window on:keydown|preventDefault={onKeyDown} />