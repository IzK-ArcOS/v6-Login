<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { State } from "$types/state";

  export let state: State;
  export let runtime: Login;
</script>

{#if state}
  <div
    class="login-page fullscreen page-{state.key} {state.attribs.className ||
      ''}"
  >
    <svelte:component
      this={state.content}
      {runtime}
      key={state.key}
      loginState={state}
    />
  </div>
{/if}
