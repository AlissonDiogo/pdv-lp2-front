<script>
    import { pop } from "svelte-spa-router";

    const goRescuePage = () => {
        pop();
    }
</script>

<main>
    <h1>Sorry, you are lost :(</h1>
    <button on:click={goRescuePage}>Rescue me!</button>
</main>

<style>
    main {
        display: grid;
        place-content: center;
        height: 100vh;
        gap: 1rem;
    }
</style>