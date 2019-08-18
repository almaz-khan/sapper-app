<script>
  export let games;
</script>

<style>
	.wrapper {
		font-weight: 300;
		padding: 0 1em;
  }

  .row {
    display: flex;
  }

  .team {
    flex: 1 0 50%;
    display: flex;
  }

  .delimiter {
    flex: 0 1 auto;
  }

  .score {
    flex: 0 1 auto;
  }

  .players {
    flex: 1 0 auto;
  }

  .red .players {
    text-align: right;
  }

  .red {
    border-bottom: 2px solid rgba(255, 0, 0, .3);
  }

  .blue {
    border-bottom: 2px solid rgba(0, 0, 255, .3);
  }

  .player {
    position: relative;
  }

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
  }

  .offense:before {
    background-image: url('../offense.svg');
  }

  .defense:before {
    background-image: url('../deffense.svg');
  }

  .red .offense,
  .red .defense {
    padding-left: 20px;
  }

  .blue .offense,
  .blue .defense {
    padding-right: 20px;
  }

  .red .defense:before,
  .red .offense:before {
    left: 3px;
  }

  .blue .defense:before,
  .blue .offense:before {
    right: 3px;
  }

  @media (max-width: 700px) {
    .player {
      display: block;
    }
  }
</style>

<div class="wrapper">
	{#each games as game}
    <div class="row">
      <div class="team blue">
        <div class="players">
          <span class="player defense">
            {game.blue.defense.firstName} {game.blue.defense.lastName.slice(0, 1).toUpperCase()}.
          </span>
          <span class="player offense">
            {game.blue.offense.firstName} {game.blue.offense.lastName.slice(0, 1).toUpperCase()}.
          </span>
        </div>
        <div class="score">{game.blue.score}</div>
      </div>
      <span class="delimiter">-</span>
      <div class="team red">
        <div class="score">{game.red.score}</div>
        <div class="players">
          <span class="player offense">
            {game.red.offense.firstName} {game.red.offense.lastName.slice(0, 1).toUpperCase()}.
          </span>
          <span class="player defense">
            {game.red.defense.firstName} {game.red.defense.lastName.slice(0, 1).toUpperCase()}.
          </span>
        </div>
      </div>
    </div>
  {/each}
</div>
