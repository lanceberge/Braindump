<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData

  afterUpdate(() => {
    }
  })
</script>

<svelte:head>
  <title>{data.filePrefix}</title>
</svelte:head>

<h1 class="text-4xl font-bold my-3">{data.filePrefix}</h1>

<div class="loaded-content max-w-none prose prose-sm sm:prose lg:prose-lg">
  {@html data.content}
</div>

<style>
  .loaded-content :global(a) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline;
    max-width: 100%;
  }

  .loaded-content :global(li) {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  .loaded-content :global(li p) {
    display: inline;
  }
</style>
