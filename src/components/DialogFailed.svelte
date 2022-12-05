<script>
  import { closeModal } from "svelte-modals";

  export let isOpen;
  export let title;
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2>{title}</h2>

      <div class="actions">
        <button on:click={closeModal} class="cancel-button">Close</button>
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
    gap: 2rem;
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
</style>
