<script context="module">
  import initApollo from '../../lib/initApollo'
  import getLoggedInUser from '../../lib/checkLoggedIn'
  import parseCookies from '../../lib/apollo'
  import { GET_PLAYERS } from '../../schemas/players'

  export async function preload(_, session) {
    const client = initApollo({
      getToken: () => parseCookies(session).token
    });

    const { loggedInUser } = await getLoggedInUser(client);

    if (!loggedInUser || !loggedInUser.username) {
			return this.redirect(302, '/');
    }

    const cache = await client.query({
      query: GET_PLAYERS
    });

    return {
      client,
      cache
    }
  }
</script>

<script>
  import { mutate, restore, query } from 'svelte-apollo'
  import { ADD_GAME } from '../../schemas/games'
  import GameForm from '../../components/GameForm.svelte'

  export let client;
  export let cache;

  restore(client, GET_PLAYERS, cache.data);
  const players = query(client, { query: GET_PLAYERS });

  async function addGame(game) {
    try {
      const data = await mutate(client, {
        mutation: ADD_GAME,
        variables: { input: game }
      });
    } catch(error) {
      // TODO
    }
  }
</script>

{#await $players}
  Loading...
{:then result}
  <GameForm {...result.data} {addGame} />
{/await}

