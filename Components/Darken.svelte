<script lang="ts">
  import { LoginState } from "$types/state";

  export let state: LoginState;
</script>

{#if state}
  <div class="fullscreen darken" class:show={state.attribs.darken} />
{/if}
