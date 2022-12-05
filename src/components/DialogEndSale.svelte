<script>
  import { onMount } from "svelte";
  import { closeModal } from "svelte-modals";
  import { findAllPaymentWays } from "../api/paymentWays";
  import { saveSale } from "../api/sale";

  export let isOpen;
  export let cart;
  export let cartTotal;
  export let onFinishSale;
  let paymentWays = [];
  let formEndSale = {};

  onMount(async () => {
    const res = await findAllPaymentWays();
    paymentWays = res;
    formEndSale = { paymentWay: res[0] };
  });

  $: cartTotalWithTax = formEndSale.paymentWay
    ? cartTotal * (1 + formEndSale.paymentWay.tax)
    : cartTotal; 

  const formatProductsToSend = () => {
    let products = [];
    cart.forEach((product) => {
      let quantityOrder = product.order;
      delete product.quantity;
      for (let i = 0; i < quantityOrder; i++) {
        products.push(product);
      }
    });
    return products;
  };

  const endSale = async () => {
    const { paymentWay } = formEndSale;
    const products = formatProductsToSend();
    const res = await saveSale({
      paymentWay,
      products,
    });
    if (res && res.id) {
      onFinishSale(products, paymentWay, cartTotal.toFixed(2), cartTotalWithTax.toFixed(2));
      closeModal();
    }
  };
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2>End sale</h2>
      <form>
        <label for="paymentWays">Payment Way</label>
        <select
          id="paymentWays"
          name="paymentWays"
          bind:value={formEndSale.paymentWay}
        >
          {#each paymentWays as paymentWay, i}
            <option value={paymentWay}>{paymentWay.name}</option>
          {/each}
        </select>
      </form>

      <div>Total: {cartTotal.toFixed(2)}</div>
      <div>Total with tax: {cartTotalWithTax.toFixed(2)}</div>

      <div class="actions">
        <button on:click={closeModal} class="cancel-button">Close</button>
        <button on:click={endSale}>Confirm Sale</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    background-color: var(--bg-color);
  }

  h2 {
    text-align: center;
    font-size: 24px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .cancel-button {
    margin-right: 10px;
    background-color: #e80505;
    color: white;
  }

  form {
    display: grid;
    gap: 0.4rem;
  }
  select {
    padding: 0.5rem;
    width: 316px;
  }
</style>
