<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { createUser } from "$ts/server/user/mutate";

  export let username: string;
  export let password: string;
  export let loading: boolean;
  export let errored: boolean;
  export let runtime: Login;

  let confirm = "";

  async function createAccount() {
    loading = true;

    const userdata = await createUser(username, password);

    if (!userdata) {
      errored = true;
      loading = false;

      return false;
    }

    runtime.proceed(userdata, username);

    return false;
  }

  function keydown(e: KeyboardEvent) {
    if (e.key == "Enter") createAccount();
  }
</script>

<div class="field-wrapper">
  <input
    type="password"
    placeholder="Confirm Password"
    bind:value={confirm}
    disabled={loading}
    on:keydown={keydown}
  />
  <button
    class="material-icons-round continue"
    on:click={createAccount}
    disabled={loading ||
      !username ||
      !password ||
      !confirm ||
      password !== confirm}
  >
    arrow_forward_ios
  </button>
</div>
