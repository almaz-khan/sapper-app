<script>
  import TeamInput from './TeamInput.svelte'

  export let addGame;
  export let players;

  let defaultGame = {
    startDate: '',
    endDate: '',
    source: 'graphQlApp',
    metadata: null
  }

  let game = {
    ...defaultGame,
    red: {
      score: 0
    },
    blue: {
      score: 0
    }
  }

  const handleSubmit = () => {
    game = {
      ...game,
      endDate: new Date()
    }
    addGame(game);

    game = {
      ...defaultGame,
      red: {
        score: 0,
        ...game.red
      },
      blue: {
        score: 0,
        ...game.blue
      }
    }
  }

  const handleChange = () => {
    if (!game.startDate) {
      game = {
        ...game,
        startDate: new Date()
      }
    }
  }
</script>

<style>
  .form {
    display: flex;
  }

  .row {
    flex: 1 0 auto;
    display: flex;
  }

	.red {
    border-bottom: 2px solid rgba(255, 0, 0, .3);
    flex-direction: row-reverse;
  }

  .blue {
    border-bottom: 2px solid rgba(0, 0, 255, .3);
  }


  @media (max-width: 700px) {
    .form {
      flex-direction: column;
    }

    .blue {
      border-top: 2px solid rgba(0, 0, 255, .3);
    }

    .blue {
      border-bottom: none;
    }

    .row {
      flex-direction: column;
    }

    .red {
      flex-direction: column-reverse;
    }
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="form">
    <div class="row blue">
      <TeamInput {players} bind:team={game.blue} onChange={handleChange} />
    </div>

    <div class="row red">
      <TeamInput {players} bind:team={game.red} onChange={handleChange} />
    </div>
  </div>

  <button type=submit>
    Submit
  </button>
</form>
