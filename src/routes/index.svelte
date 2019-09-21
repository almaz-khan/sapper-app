<script context="module">
  import initApollo from '../lib/initApollo';
  import { GET_GAMES } from '../schemas/games';
  import moment from 'moment';

  export async function preload(_, { token }) {
    const client = initApollo({}, token);

    const cache = await client.query({
      query: GET_GAMES,
      variables: {
        query: {
          startDate: {
            gte: moment()
              .subtract(100, 'days')
              .format(moment.defaultFormatUtc)
          }
        }
      }
    });

    return {
      cache
    };
  }
</script>

<script>
  import { setClient, restore, query } from 'svelte-apollo';
  import { stores } from '@sapper/app';
  import Games from '../components/Games.svelte';

  export let cache;
  const { session } = stores();
  const client = initApollo({}, session.token);

  restore(client, GET_GAMES, cache.data);
  setClient(client);

  // query a subset of the preloaded (the rest if for Account)
  const data = query(client, { query: GET_GAMES });
</script>

{#await $data}
  Loading won't be shown if sufficient data loaded in preload
{:then result}
  <Games {...result.data} />
{/await}
