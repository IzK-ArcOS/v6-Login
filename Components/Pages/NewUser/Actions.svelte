<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { sleep } from "$ts/util";

  export let runtime: Login;

  async function existing() {
    runtime.setUser(null);

    await sleep(0);

    runtime.stateHandler.navigate("existinguserauth");
  }
</script>

<button class="normal link createaccount" on:click={existing}>
  I have an account
</button>
