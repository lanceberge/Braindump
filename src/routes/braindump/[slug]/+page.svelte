<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="loaded-content">{@html data.content}</div>
