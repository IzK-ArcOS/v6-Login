<script lang="ts">
  export let errored: boolean;
</script>

<p class="incorrect">The username or password is incorrect.</p>
<button class="normal switchuser" on:click={() => (errored = false)}> Try again </button>
