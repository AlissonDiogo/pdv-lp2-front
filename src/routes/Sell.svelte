<script>
    import ProductPanel from "../components/ProductPanel.svelte";
</script>

<section id="sell-container">
    <aside>
        <header>
            <input type="text" autofocus/>
            <button>By Code</button>
        </header>
        <main>
            <ul>
                {#each Array(20) as _,_} 
                <li>
                    <ProductPanel name="Product" value="10"/>
                </li>
                {/each}
            </ul>
        </main>
    </aside>
    <main id="cart-container">
        <header>
            <h1>Cart</h1>
        </header>
        <main>
            <ul>
                {#each Array(20) as _, _}
                <li>
                    <main>
                        <span>2x</span>
                        <h3>Product X</h3>
                    </main>
                    <aside>$ 10</aside>
                </li>
                {/each}
            </ul>
        </main>
        <footer>
            <main>
                <h4>Total $ </h4>
                <p>10</p>
            </main>
            <footer>
                <button>Submit</button>
            </footer>
        </footer>
    </main>
</section>

<style>
    section {
        display: flex;
        justify-content: space-between;
        height: 100vh;
    }

    section > * {
        padding: 2rem;
    }

    aside {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    aside > main {
        width: 40rem;
        overflow: scroll;
    }

    aside input {
        padding: .6rem;
    }

    aside > header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    #cart-container {
        background-color: var(--dark-color);
        width: 30rem;
        display: flex;
        gap: 1rem;
        flex-direction: column;
        justify-content: space-between;
    }

    #cart-container > main {
        overflow: scroll;
    }

    aside ul,
    #cart-container ul,
    footer {
        display: grid;
        gap: 1rem;
    }

    aside li,
    #cart-container li,
    #cart-container li main,
    footer > main {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }
</style>