<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

{#each data.files as file}
  <li><a href="/braindump/{file}">{file}</a></li>
{/each}
