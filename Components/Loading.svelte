<script lang="ts">
  import { Login } from "$state/Login/ts/main";
  import UserHeader from "./UserHeader.svelte";
  import WelcomeSpinner from "./WelcomeSpinner.svelte";

  export let runtime: Login;
  export let caption: string;
</script>

<div class="login-loading">
  <UserHeader {runtime} />
  <WelcomeSpinner {caption} />
</div>
