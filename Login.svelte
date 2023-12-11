<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { getUsers } from "$ts/server/user/get";
  import { UserName } from "$ts/stores/user";
  import { sleep } from "$ts/util";
  import { State } from "$types/state";
  import { onMount } from "svelte";
  import Background from "./Components/Background.svelte";
  import Darken from "./Components/Darken.svelte";
  import Paging from "./Components/Paging.svelte";
  import Topbar from "./Components/Topbar.svelte";
  import "./css/newlogin.css";

  export let thisState: State;

  let runtime: Login;
  let state: State;

  let show = false;

  onMount(async () => {
    runtime = new Login("autologin", !thisState.attribs.continuation);

    if (thisState.attribs.continuation) {
      runtime.setUser($UserName);
      runtime.stateHandler.navigate(thisState.attribs.continuation as string);
    }

    await sleep(500);

    show = true;

    runtime.stateHandler.current.subscribe((v) => {
      if (!v) return;

      state = v;

      if (state.onload) state.onload();
    });
  });
</script>

{#if runtime}
  <div class="newlogin fullscreen" class:show>
    <Background {state} {runtime} />
    <Darken {state} />
    <Topbar {state} {runtime} />
    <Paging {state} {runtime} />
  </div>
{/if}
