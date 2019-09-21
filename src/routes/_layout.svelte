<script context="module">
  import initApollo from '../lib/initApollo'
  import getLoggedInUser from '../lib/checkLoggedIn'

  export async function preload(_, session) {
    const client = initApollo({}, session.token);

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

  @media (max-width: 700px) {
    main {
      padding: .5em;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .menu {
    flex: 0 1 auto;
  }

  .container {
    flex: 1 0 auto;
    position: relative;
  }

  .content {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    overflow: auto;
  }
</style>

<div class="wrapper">
  <div class="menu">
    <Nav {segment} {...user} />
  </div>

  <div class="container">
    <div class="content">
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</div>
