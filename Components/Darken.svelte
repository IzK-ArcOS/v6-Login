<script lang="ts">
  import { State } from "$types/state";

  export let state: State;
</script>

{#if state}
  <div class="fullscreen darken" class:show={state.attribs.darken} />
{/if}
