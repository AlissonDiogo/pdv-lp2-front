<script>
    export let name, value;
</script>

<section>
    <h3>{name}</h3>
    <p>$ {value}</p>
</section>

<style>
    section {
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: var(--dark-color);
        padding: 1rem;
    }
</style>