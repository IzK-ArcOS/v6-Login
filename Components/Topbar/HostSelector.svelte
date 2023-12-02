<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import { getAllServers, getServer, setServer } from "$ts/server/multi";
  import { PrimaryState } from "$ts/states";
  import { sleep } from "$ts/util";
  import { onMount } from "svelte";

  export let runtime: Login;

  let selectedServer = getServer();
  let servers = [];

  onMount(() => {
    servers = getAllServers();
  });

  async function changeServer() {
    await sleep(0);

    if (selectedServer == "$new") return PrimaryState.navigate("fts");

    setServer(selectedServer);

    runtime.UserName.set("ArcOS");
    runtime.stateHandler.navigate("restart");
  }
</script>

<select on:change={changeServer} bind:value={selectedServer} class="host">
  {#each servers as server}
    <option value={server}>{server}</option>
  {/each}
  <option value="$new">Add Server...</option>
</select>
