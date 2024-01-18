<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { LoginState } from "$types/state";
  import { onMount } from "svelte";
  import Clock from "./Topbar/Clock.svelte";
  import HostSelector from "./Topbar/HostSelector.svelte";
  import Right from "./Topbar/Right.svelte";

  export let runtime: Login;
  export let state: LoginState;

  let show = false;

  onMount(() => {
    setTimeout(() => (show = true), 750);
  });
</script>

{#if state}
  <div class="topbar" class:show={(state.attribs.topbar || false) && show}>
    <HostSelector {runtime} />
    <Clock />
    <Right {runtime} />
  </div>
{/if}
