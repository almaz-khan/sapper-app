<script context="module">
  import initApollo from '../lib/initApollo';
  import getLoggedInUser from '../lib/checkLoggedIn';

  export async function preload(_, session) {
    const client = initApollo({}, session.token);

    const user = await getLoggedInUser(client);

    return {
      user
    };
  }
</script>

<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
  export let user;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: 700px) {
    main {
      padding: 0.5em;
    }
  }

  .wrapper {
    padding-top: var(--nav-h);
  }
</style>

<div class="wrapper">
  <header class="menu">
    <Nav {segment} {...user} />
  </header>

  <main>
    <slot />
  </main>
</div>
