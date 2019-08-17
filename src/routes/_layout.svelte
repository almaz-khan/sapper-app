<script context="module">
  import initApollo from '../lib/initApollo'
  import getLoggedInUser from '../lib/checkLoggedIn'
  import parseCookies from '../lib/apollo'

  export async function preload(_, session) {
    const client = initApollo({
      getToken: () => parseCookies(session).token
    });

    const user = await getLoggedInUser(client);

    return {
      user
    }
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
</style>

<Nav {segment} {...user}/>

<main>
	<slot></slot>
</main>
