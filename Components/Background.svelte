<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { getWallpaper } from "$ts/wallpaper";
  import { LoginState } from "$types/state";

  export let state: LoginState;
  export let runtime: Login;

  const { userBackground } = runtime;

  let style = "img15";

  $: style;

  userBackground.subscribe(async (v) => {
    const wallpaper = await getWallpaper(v || "img15", "img15");

    style = `--bg: url(${wallpaper.url});`;
  });
</script>

{#if state}
  <div
    class="background fullscreen"
    {style}
    class:zoom={state.attribs.darken}
  />
{/if}
