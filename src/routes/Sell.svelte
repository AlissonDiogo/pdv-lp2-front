<script>
  import { onMount } from "svelte";
  import ProductPanel from "../components/ProductPanel.svelte";
  import Quagga from "quagga";
  import html2pdf from "html2pdf.js";
  import DialogNewProduct from "../components/DialogNewProduct.svelte";
  import DialogFailed from "../components/DialogFailed.svelte";
  import DialogEndSale from "../components/DialogEndSale.svelte";
  import { Modals, openModal, closeModal } from "svelte-modals";
  import { fade } from "svelte/transition";

  import {
    findAllProducts,
    findByNameRegex,
    findByBarcode,
    verifyIsAvailableByQuantity,
  } from "../api/products";

  let products = [];
  let visibleProducts = [];
  let cart = [];
  let scannerRef;
  let a, o, g;
  let searchProductBy = "";

  $: cartTotal = cart.reduce(
    (total, product) => total + Number(product.order) * Number(product.price),
    0
  );

  onMount(async () => {
    const res = await findAllProducts();
    products = res;
    visibleProducts = products;
  });

  const addProduct = async (newProduct) => {
    const productIndexOnCart = cart.findIndex(
      (product) => product.id === newProduct.id
    );

    if (productIndexOnCart >= 0) {
      const { name, order } = cart[productIndexOnCart];
      if (await verifyIsAvailableByQuantity(name, order + 1)) {
        ++cart[productIndexOnCart].order;
        cart = cart;
      } else {
        openModal(DialogFailed, {
          title: `Product is not available in ${order + 1} quantity.`,
        });
      }
    } else {
      newProduct.order = 1;
      if (
        await verifyIsAvailableByQuantity(newProduct.name, newProduct.order)
      ) {
        cart = [...cart, newProduct];
      } else {
        openModal(DialogFailed, {
          title: "Product is not available.",
        });
      }
    }
  };

  const scan = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef,
        },
        frequency: 25,
        decoder: {
          readers: ["ean_reader"],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }

        Quagga.start();
      }
    );
  };

  Quagga.onDetected(async (data) => {
    const barcode = data.codeResult.code;
    try {
      const product = await findByBarcode(barcode);
      if (product) {
        addProduct(product);
        beep();
        Quagga.stop();
      }
    } catch (error) {
      console.error(error);
    }
  });

  const setupAudio = () => {
    let AudioContext = window.AudioContext;
    a = new AudioContext();
  };

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
  };

  const setSearchProductBy = (e) => {
    searchProductBy = e.target.value;
  };

  const downloadCartPDF = (products, paymentWay, subTotal, totalWithTaxes) => {
    const note = document.createElement("section");
    note.style.color = "black";
    note.style.backgroundColor = "white";

    note.innerHTML += `Products:<br/>`;
    products.forEach((product) => {
      note.innerHTML += `${product.name} $ ${product.price}<br/>`;
    });
    note.innerHTML += '<br/>';
    note.innerHTML += `Subtotal: $ ${subTotal}<br/>`;
    note.innerHTML += `Payment way: ${paymentWay.name} (Tax ${paymentWay.tax * 100}%)<br/>`;
    note.innerHTML += `Total with taxes: $ ${totalWithTaxes}`;

    const optsPDF = {
      margin: 1,
      filename: `Fiscal Note`,
      html2canvas: { scale: 2 },
    };

    html2pdf().from(note).set(optsPDF).save();
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    visibleProducts = await findByNameRegex(searchProductBy);
  };

  const showNewProductDialog = () => {
    openModal(DialogNewProduct);
  };

  const showEndSaleDialog = () => {
    openModal(DialogEndSale, { cart, cartTotal, onFinishSale });
  };

  const onFinishSale = (products, paymentWay, subTotal, totalWithTaxes) => {
    downloadCartPDF(products, paymentWay, subTotal, totalWithTaxes);
    cart = [];
    closeModal();
  };

  const handleInputProductQuantity = async (e, product) => {
    const newQuantity = parseInt(e.target.value) || 0;
    e.target.value = product.order;

    if (newQuantity < 0) {
      e.target.value = product.order;
      return product.order;
    }

    if (
      await verifyIsAvailableByQuantity(product.name, newQuantity)
    ) {
      return newQuantity;
    } else {
      openModal(DialogFailed, {
        title: `Product is not available in ${newQuantity} quantity.`,
      });
      e.target.value = product.order;
      return product.order;
    }
  }
</script>

<section id="sell-container">
  <aside>
    <header>
      <form on:submit={handleSearch}>
        <input
          type="text"
          value={searchProductBy}
          on:input={setSearchProductBy}
          placeholder="Search by name"
          autofocus
        />
        <button>Search</button>
      </form>
      <section id="camera" bind:this={scannerRef} />
      <button on:click={initScan}>Scan</button>
      <button on:click={showNewProductDialog}>New product</button>
    </header>
    <ul>
      {#each visibleProducts as product, i}
        <button on:click={() => addProduct(product)}>
          <li id={"product" + i}>
            <ProductPanel name={product.name} value={product.price} />
          </li>
        </button>
      {/each}
    </ul>
  </aside>
  <main>
    <header>
      <h1>Cart</h1>
    </header>
    <ul id="products-cart">
      {#each cart as product, i}
        <li id={"cartProduct" + i}>
          <section>
            <input 
              type=number
              min=0
              step=1
              value={product.order}
              on:input={
                async (e) => {
                  product.order = await handleInputProductQuantity(e, product);
                  if (product.order === 0) {
                    cart.splice(i, 1);
                  }
                } 
              }
              pattern="[0-9]"
            >
            <h3>{product.name}</h3>
          </section>
          <aside>$ {Number(product.price * product.order).toFixed(2)}</aside>
        </li>
      {/each}
    </ul>
    <footer>
      <section id="total-section">
        <h4>Total</h4>
        <p>$ {cartTotal.toFixed(2)}</p>
      </section>
      <button on:click={showEndSaleDialog}>Submit</button>
    </footer>
  </main>

  <Modals>
    <div
      slot="backdrop"
      class="backdrop"
      on:click={closeModal}
      transition:fade
    />
  </Modals>
</section>

<style>
  #sell-container {
    display: flex;
    justify-content: space-between;
    height: 100vh;
  }

  #sell-container > * {
    padding: 2rem;
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  aside ul {
    width: 40rem;
    overflow-y: scroll;
  }

  aside input {
    padding: 0.6rem;
  }

  aside > header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  main {
    background-color: var(--light-color);
    width: 30rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: space-between;
  }

  main > ul {
    overflow-y: scroll;
  }

  input[type=number] {
    padding: 10px;
    font-size: 1rem;
  }

  main > ul > li > section {
    display: flex;
    align-items: center;
  }

  main > ul > li > section > input[type=number] {
    width: 70px;
  }

  main > ul > li {
    display: flex;
    align-items: center;
  }

  aside ul,
  main ul,
  footer {
    display: grid;
    gap: 1rem;
  }

  aside li,
  main li,
  main li section,
  footer > section {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  #camera {
    display: none;
  }

  ul button {
    padding: 0;
    border: 0;
    margin: 0;
  }

  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
