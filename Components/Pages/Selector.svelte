<script lang="ts">
  import User from "$state/Login/Components/Pages/Selector/User.svelte";
  import { Login } from "$state/Login/ts/main";
  import { getUsers } from "$ts/server/user/get";
  import { sleep } from "$ts/util";
  import { onMount } from "svelte";

  export let runtime: Login;

  let users;

  onMount(async () => {
    runtime.UserCache.subscribe((v) => v && (users = v));

    runtime.UserCache.set(await getUsers());
  });

  async function register() {
    runtime.setUser(null);

    await sleep();

    runtime.stateHandler.navigate("newuserauth");
  }
</script>

<div class="login-selector">
  <div class="users">
    {#if users}
      {#each Object.keys(users) as username}
        <User {runtime} data={users[username]} name={username} />
      {/each}
    {/if}
  </div>
  <button class="register normal" on:click={register}>Create Account</button>
</div>
