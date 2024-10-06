<script lang="ts">
  import HtmlPage from '$components/HtmlPage.svelte'
  import type { PageData } from './$types'

  export let data: PageData
  const title: string = "Braindump"
</script>

<HtmlPage {title} content={data.content} />
