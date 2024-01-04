<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { sleep } from "$ts/util";

  export let runtime: Login;

  async function register() {
    runtime.setUser(null);

    await sleep();

    runtime.stateHandler.navigate("newuserauth");
  }

  async function switchUser() {
    runtime.setUser(null);

    await sleep();

    runtime.stateHandler.navigate("selector");
  }
</script>

<button class="normal switchuser" on:click={switchUser}>Show Picker</button>
<button class="normal link createaccount" on:click={register}>
  I have no account
</button>
