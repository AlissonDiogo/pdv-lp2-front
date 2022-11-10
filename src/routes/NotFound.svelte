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