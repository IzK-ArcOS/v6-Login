<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { get } from "svelte/store";
  import UserHeader from "../UserHeader.svelte";
  import WelcomeSpinner from "../WelcomeSpinner.svelte";
  import Actions from "./ExistingUser/Actions.svelte";
  import Incorrect from "./ExistingUser/Incorrect.svelte";

  export let runtime: Login;

  let loading = false;
  let username = get(runtime.UserName);
  let errored = false;
  let password = "";

  async function login() {
    loading = true;

    const username = get(runtime.UserName);
    const userdata = await runtime.Authenticate(username, password);

    if (!userdata) {
      loading = false;
      errored = true;

      return;
    }

    await runtime.proceed(username);
  }

  function setUsername() {
    runtime.UserName.set(username);
  }

  function keydown(e: KeyboardEvent) {
    if (e.key == "Enter") login();
  }
</script>

<div class="login-loading">
  <UserHeader {runtime} override="Login" />
  {#if !loading}
    {#if !errored}
      <div class="field-wrapper">
        <input
          type="text"
          disabled={loading}
          on:keydown={keydown}
          on:keyup={setUsername}
          bind:value={username}
          placeholder="Username"
        />
      </div>
      <div class="field-wrapper continue">
        <input
          type="password"
          bind:value={password}
          disabled={loading}
          on:keydown={keydown}
          placeholder="Password"
        />
        <button class="material-icons-round continue" on:click={login} disabled={!password}>
          arrow_forward_ios
        </button>
      </div>
      <Actions {runtime} />
    {:else}
      <Incorrect bind:errored />
    {/if}
  {:else}
    <WelcomeSpinner />
  {/if}
</div>
