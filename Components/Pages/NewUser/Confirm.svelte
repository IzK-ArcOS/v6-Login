<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { Authenticate } from "$ts/server/user/auth";
  import { createUser } from "$ts/server/user/mutate";

  export let username: string;
  export let password: string;
  export let loading: boolean;
  export let errored: boolean;
  export let runtime: Login;

  let confirm = "";

  async function createAccount() {
    loading = true;

    const created = await createUser(username, password);

    if (!created) {
      errored = true;
      loading = false;

      return false;
    }

    await Authenticate(username, password);

    runtime.proceed(username);

    return false;
  }

  function keydown(e: KeyboardEvent) {
    if (e.key == "Enter") createAccount();
  }
</script>

<div class="field-wrapper continue">
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
