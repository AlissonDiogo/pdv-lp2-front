<script>
    import ProductPanel from "../components/ProductPanel.svelte";
    import products from "../dump/products.json";
    let visibleProducts = products;

    import Quagga from "quagga";

    let scannerRef;
    let a, o, g;
    let searchProductBy = "";

    const scan = () => {
        Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            target: scannerRef
        },
        decoder : {
            readers : ["ean_reader"]
        }
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }

            Quagga.start();
        });
    };

    Quagga.onDetected((data) => {
        searchProductBy = data.codeResult.code;
        console.log(data)
        beep();
        Quagga.stop();
    });

    const setupAudio = () => {
		let AudioContext = window.AudioContext;
		a = new AudioContext();
	}

    const beep = () => {
		o = a.createOscillator();
		g = a.createGain();
		o.connect(g);
		o.type = "square";
		o.frequency.value = 620;
		g.connect(a.destination);
		o.start(a.currentTime);
		o.stop(a.currentTime + 0.1);
	};

    const initScan = () => {
        setupAudio();
        scan();
    }

    const handleSearch = (e) => {
        searchProductBy = e.target.value
        const regexSearch = new RegExp(searchProductBy, "i");
        visibleProducts = products.filter(product =>
            regexSearch.test(product.name) ||
            regexSearch.test(product.code)
        )
    }
</script>

<section id="sell-container">
    <aside>
        <header>
            <input
                type="text"
                value={searchProductBy}
                on:input={handleSearch}
                placeholder="Search by name or code"
                autofocus  />
            <section id="camera" bind:this={scannerRef} />
            <button on:click={initScan}>Scan</button>
        </header>
        <main>
            <ul>
                {#each visibleProducts as product, i} 
                <li id={"product" + i}>
                    <ProductPanel name={product.name} value={product.value} />
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

    #camera {
        display: none;
    }
</style>