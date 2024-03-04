<script lang="ts">
  import ProfilePicture from "$lib/Components/ProfilePicture.svelte";
  import { Login } from "$state/Login/ts/main";
  import { UpdateIcon } from "$ts/images/general";
  import { getProfilePicture } from "$ts/stores/pfp";
  import { UserData } from "$types/user";
  import { onMount } from "svelte";

  let pfp = "";

  export let runtime: Login;
  export let data: UserData;
  export let name: string;

  async function go() {
    runtime.setUser(name);
    runtime.stateHandler.navigate("existinguserauth");
  }

  onMount(() => {
    pfp = getProfilePicture(data.acc.profilePicture);
  });
</script>

{#if data.acc.enabled}
  <button class="user" on:click={go}>
    <ProfilePicture src={pfp} height={50} />
    <p class="username">
      <span>{name} </span>
      {#if data.acc.v6}
        <img src={UpdateIcon} alt="" class="v6" title="{name} is a v6 user!" />
      {/if}
    </p>
  </button>
{/if}
