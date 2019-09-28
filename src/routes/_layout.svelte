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
    padding: var(--nav-h) 2em 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: 700px) {
    main {
      padding: var(--nav-h) 0.5em 0.5em;
    }
  }
</style>

<header class="menu">
  <Nav {segment} {...user} />
</header>

<main>
  <slot />
</main>
