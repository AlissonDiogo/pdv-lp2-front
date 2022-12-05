<script>
	import { useForm, validators, HintGroup, Hint, email, required } from "svelte-use-form";
	const form = useForm();
</script>

<main>
  <form use:form>
    <h1>Welcome!</h1>

    <section>
      <input
        placeholder="Your email"
        type="email"
        name="email" use:validators={[required, email]}
      />
      <HintGroup for="email">
        <Hint on="required">This is a mandatory field</Hint>
        <Hint on="email" hideWhenRequired>Email is not valid</Hint>
      </HintGroup>
    </section>

    <section>
      <input
        placeholder="Your password"
        type="password"
        name="password"
        use:validators={[required]}
      />
      <Hint for="password" on="required">This is a mandatory field</Hint>
    </section>

    <button disabled={!$form.valid}>Sign in</button>
  </form>
</main>

<style>
	:global(.touched:invalid) {
    border: 1px solid red;
	}

  main {
    height: 100vh;
    display: grid;
    place-content: center;
  }

  form {
    display: grid;
    gap: 2rem;
  }

  form input,
  form button {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 8px;
  }

  form section {
    display: grid;
    gap: 10px;
  }
</style>