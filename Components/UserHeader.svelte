<script lang="ts">
  import ProfilePicture from "$lib/Components/ProfilePicture.svelte";
  import { onMount } from "svelte";
  import { Login } from "$state/Login/ts/main";
  import { getUserPfp } from "$ts/server/user/pfp";

  export let runtime: Login;

  let pfp = "";
  let username = "ArcOS";

  onMount(() =>
    runtime.UserName.subscribe(async (v) => {
      if (!v) return;

      username = v;
      pfp = await getUserPfp(v);
    })
  );
</script>

<ProfilePicture src={pfp} height={151} />
<h1>{username}</h1>
