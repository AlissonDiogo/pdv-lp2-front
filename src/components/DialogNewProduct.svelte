<script>
  import { closeModal } from "svelte-modals";
  import { saveProduct } from "../api/products";

  export let isOpen;
  let form = {};

  const submitForm = async () => {
    console.log({ form });
    let findError = verifyErrors();
    if (!findError) {
      delete form.error;
      const product = await saveProduct(form);
      if (product) {
        closeModal();
      } else {
        form = {}
      }
    }
  };

  const verifyErrors = () => {
    form.error = { 
      name: !form.name,
      price: !form.price,
      category: !form.category,
      quantity: !form.quantity,
    };
    return !form.name || !form.price || !form.category || !form.quantity;
  };

  const handleChangeName = (e) => {
    if (e.target.value) {
      form.error = { ...form.error, name: null };
    }
  };

  const handleChangePrice = (e) => {
    if (e.target.value) {
      form.error = { ...form.error, price: null };
    }
  };

  const handleChangeCategory = (e) => {
    if (e.target.value) {
      form.error = { ...form.error, category: null };
    }
  };

  const handleChangeQuantity = (e) => {
    if (e.target.value) {
      form.error = { ...form.error, quantity: null };
    }
  };
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2>Create a new product</h2>

      <form method="POST">
        <label for="name">Product name</label>
        <input
          id="name"
          name="name"
          bind:value={form.name}
          on:input={handleChangeName}
          required
        />
        {#if form?.error?.name}<p class="error">
            The name field is required
          </p>{/if}

        <label for="category">Category</label>
        <select
          id="category"
          name="category"
          bind:value={form.category}
          on:change={handleChangeCategory}
        >
          <option value="snacks">Snacks</option>
          <option value="candy">Candy</option>
        </select>
        {#if form?.error?.category}<p class="error">
            The category field is required
          </p>{/if}

        <label for="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          bind:value={form.price}
          on:input={handleChangePrice}
        />
        {#if form?.error?.price}<p class="error">
            The price field is required
          </p>{/if}

        <label for="quantity">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          bind:value={form.quantity}
          on:input={handleChangeQuantity}
        />
        {#if form?.error?.quantity}<p class="error">
            The quantity field is required
          </p>{/if}
      </form>

      <div class="actions">
        <button on:click={closeModal} class="cancel-button">Cancel</button>
        <button on:click={submitForm}>Create</button>
      </div>
    </div>
  </div>
{/if}

<style>
  form {
    display: grid;
    gap: .4rem;
  }

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    background-color: var(--bg-color);
  }

  h2 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }

  .cancel-button {
    margin-right: 10px;
    background-color: #e80505;
    color: white;
  }

  input {
    padding: 0.5rem;
    width: 300px;
  }

  .error {
    color: #e80505;
    font-size: 12px;
  }

  select {
    padding: 0.5rem;
    width: 316px;
  }

  label {
    display: block;
    margin-top: 5px;
  }
</style>
