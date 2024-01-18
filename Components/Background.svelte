<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { getWallpaper } from "$ts/wallpaper";
  import { LoginState } from "$types/state";
  import { onMount } from "svelte";

  export let state: LoginState;
  export let runtime: Login;

  let style = "img15";

  $: style;

  onMount(() =>
    runtime.userBackground.subscribe(async (v) => {
      const wallpaper = await getWallpaper(v || "img15", "img15");

      style = `--bg: url(${wallpaper.url});`;
    })
  );
</script>

{#if state}
  <div
    class="background fullscreen"
    {style}
    class:zoom={state.attribs.darken}
  />
{/if}
