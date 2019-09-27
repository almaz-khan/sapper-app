<script>
  export let segment;
  export let loggedInUser;

  let hidden = false;
  let lastScroll = 0;
  const handleScroll = () => {
    const scroll = window.pageYOffset;

    hidden = scroll > 50 && scroll > lastScroll;
    lastScroll = scroll;
  };
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
    height: var(--nav-h);
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1;
    transform: none;
    transition: transform 0.2s;
    background: white;
  }

  .hidden {
    transform: translate(0, calc(-100% - 1rem));
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .user {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 15px;
    background-color: peachpuff;
    color: slategray;
    text-transform: uppercase;
    text-align: center;
    line-height: 30px;
  }
</style>

<svelte:window on:scroll={handleScroll} />

<nav class:hidden>
  <ul>
    <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">games</a>
    </li>
    {#if !loggedInUser || !loggedInUser.username}
      <li>
        <a class={segment === 'signin' ? 'selected' : ''} href="/signin">
          sign in
        </a>
      </li>
      <li>
        <a class={segment === 'signup' ? 'selected' : ''} href="/signup">
          sign up
        </a>
      </li>
    {:else}
      <li>
        <a class={segment === 'games' ? 'selected' : ''} href="/games/new">
          add game
        </a>
      </li>
    {/if}
  </ul>
  {#if loggedInUser && loggedInUser.username}
    <div class="user" title={loggedInUser.username}>
      {loggedInUser.username.slice(0, 1)}
    </div>
  {/if}
</nav>
