<script context="module">
  import initApollo from '../lib/initApollo';
  import getLoggedInUser from '../lib/checkLoggedIn';

  export async function preload(_, session) {
    const client = initApollo({}, session.token);

    const { loggedInUser } = await getLoggedInUser(client);

    if (loggedInUser && loggedInUser.username) {
      return this.redirect(302, '/');
    }
  }
</script>

<script>
  import { mutate } from 'svelte-apollo';
  import { stores } from '@sapper/app';
  import { SIGN_IN } from '../schemas/signin';
  import redirect from '../lib/redirect';

  const { session } = stores();
  const client = initApollo({}, session.token);

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
        $session.token = signIn.token;
        client.cache.reset().then(() => {
          redirect({ res: null }, '/');
        });
      }
    } catch (error) {
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
