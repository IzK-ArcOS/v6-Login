<script lang="ts">
  import ProfilePicture from "$lib/Components/ProfilePicture.svelte";
  import { Login } from "$state/Login/ts/main";
  import { Logo } from "$ts/branding";
  import { getUserPfp } from "$ts/server/user/pfp";

  export let runtime: Login;
  export let override = "";

  let pfp = "";
  let username = "ArcOS";

  const { UserName, UserCache } = runtime;

  UserName.subscribe(async (v) => {
    /*     if (!v) return; */

    username = v;
    pfp = await getUserPfp(v, Logo(), $UserCache);
  });
</script>

<ProfilePicture src={pfp} height={151} fallback={Logo()} />
<h1>{!username || username == "ArcOS" ? override : username}</h1>
