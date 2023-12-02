<script lang="ts">
  import Spinner from "$lib/Components/Spinner.svelte";
  import { Login } from "$state/Login/ts/main";
  import { CurrentLogItem } from "$ts/console";
  import { ARCOS_MODE } from "$ts/metadata";
  import { onMount } from "svelte";
  import { get, writable } from "svelte/store";
  import Loading from "../Loading.svelte";

  export let runtime: Login;
  export let key = "";

  let full = false;
  let caption = writable("");

  const CAPTIONS = {
    logoff: "Goodbye!",
    restart: "Restarting",
    shutdown: "Shutting down",
    autologin: "Welcome",
  };

  CurrentLogItem.subscribe((v) => {
    $caption =
      ARCOS_MODE == "development" ? v.msg : CAPTIONS[key || "autologin"];
  });

  onMount(() => {
    const username = get(runtime.UserName);

    full = /*  !username || username == "ArcOS"; */ false;
  });
</script>

{#if !full}
  <Loading {runtime} caption={$caption} />
{:else}
  <div class="login-full">
    <Spinner height={30} />
    <span>{$caption}</span>
  </div>
{/if}
