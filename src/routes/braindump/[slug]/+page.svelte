<script lang="ts">
  import HtmlPage from '$components/HtmlPage.svelte'
  import type { PageData } from '../$types'

  export let data: PageData
</script>

<HtmlPage title={data.filePrefix} content={data.content} />
