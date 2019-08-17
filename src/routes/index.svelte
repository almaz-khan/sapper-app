<script context="module">
  import initApollo from '../lib/initApollo'
  import parseCookies from '../lib/apollo'
  import { GET_GAMES } from '../schemas/games'

  export async function preload(_, session) {
    const client = initApollo({
      getToken: () => parseCookies(session).token
    });

    const cache = await client.query({
      query: GET_GAMES
    });

    return {
      cache,
      client
    }
  }
</script>

<script>
  import { setClient, restore, query } from 'svelte-apollo'

  export let cache;
  export let client;
  restore(client, GET_GAMES, cache.data);
  setClient(client);

  // query a subset of the preloaded (the rest if for Account)
  const data = query(client, {query: GET_GAMES});
</script>

{#await $data}
  Loading won't be shown if sufficient data loaded in preload
{:then result}
  {#each result.data.games as game}
    {game.red.score}
  {/each}
{/await}
