<script>
  export let team = {};
  export let players;
  export let onChange = () => {};
</script>

<style>
  .defense:before,
  .offense:before {
    content: ' ';
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 15px;
    height: 15px;
    left: 0px;
  }

  .offense:before {
    background-image: url('../offense.svg');
  }

  .defense:before {
    background-image: url('../deffense.svg');
  }

  .offense,
  .defense {
    position: relative;
    padding-left: 20px;
  }

  input {
    width: 30px;
    font-size: 1rem;
  }

  select,
  option {
    font-size: 1rem;
  }
</style>

<span class="defense">
  <select
    bind:value={team.defense}
    on:change={() => {
      onChange(team);
    }}>
    {#each players as player}
      <option value={player._id}>{player.firstName} {player.lastName}</option>
    {/each}
  </select>
</span>

<span class="offense">
  <select
    bind:value={team.offense}
    on:change={() => {
      onChange(team);
    }}>
    {#each players as player}
      <option value={player._id}>{player.firstName} {player.lastName}</option>
    {/each}
  </select>
</span>

<input
  type="number"
  bind:value={team.score}
  on:change={() => {
    onChange(team);
  }} />
