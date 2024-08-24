<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<!-- TODO can I just use the exported field -->
{#each data.filenamesAndFilePrefixes as [filename, filePrefix]}
  <li><a href="/braindump/{filename}">{filePrefix}</a></li>
{/each}
