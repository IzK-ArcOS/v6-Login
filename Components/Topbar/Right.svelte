<script lang="ts">
  import { Login } from "$state/Login/ts/main";

  export let runtime: Login;

  function shutdown() {
    runtime.UserName.set("ArcOS");
    runtime.stateHandler.navigate("shutdown");
  }

  function restart() {
    runtime.UserName.set("ArcOS");
    runtime.stateHandler.navigate("restart");
  }
</script>

<div class="right">
  <button class="nopad" on:click={shutdown}>
    <span class="material-icons-round">power_settings_new</span>
  </button>
  <button class="nopad" on:click={restart}>
    <span class="material-icons-round">restart_alt</span>
  </button>
</div>
