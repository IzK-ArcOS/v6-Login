<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { LoginState } from "$types/state";

  export let state: LoginState;
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
