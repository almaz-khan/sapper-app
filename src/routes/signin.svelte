<script context="module">
  import initApollo from '../lib/initApollo'
  import getLoggedInUser from '../lib/checkLoggedIn'
  import parseCookies from '../lib/apollo'

  export async function preload(_, session) {
    const client = initApollo({
      getToken: () => parseCookies(session).token
    });

    const { loggedInUser } = await getLoggedInUser(client);

    if (loggedInUser && loggedInUser.username) {
			return this.redirect(302, '/');
		}

    return {
      client
    }
  }
</script>

<script>
  import { mutate } from 'svelte-apollo'
  import { SIGN_IN } from '../schemas/signin'
  import redirect from '../lib/redirect'
  import cookie from 'cookie'

  export let client;
  let email = '';
  let password = '';

  async function signIn() {
    try {
      const data = await mutate(client, {
        mutation: SIGN_IN,
        variables: { email, password }
      });

      const signIn = data && data.data && data.data.signIn;

      if (signIn) {
        document.cookie = cookie.serialize('token', signIn.token, {
          maxAge: 30 * 24 * 60 * 60 // 30 days
        });

        client.cache.reset().then(() => {
          redirect({res: null}, '/');
        });
      }
    } catch(error) {
      // TODO
    }
  }
</script>

<style>
  label {
    display: block;
  }
</style>

<form on:submit|preventDefault={signIn}>
  <div>
    <label for="user-email">Email</label>
    <input type="text" id="user-email" bind:value={email} />
  </div>
  <div>
    <label for="user-password">Password</label>
    <input type="password" id="user-password" bind:value={password} />
  </div>
  <button type="submit">Sign In</button>
</form>

