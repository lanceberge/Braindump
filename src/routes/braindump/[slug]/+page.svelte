<script lang="ts">
  import type { PageData } from './$types'
  import { afterUpdate } from 'svelte'
  import hljs from 'highlight.js/lib/common'

  export let data: PageData

  afterUpdate(() => {
    const contentDiv = document.querySelector('.loaded-content')
    if (contentDiv) {
      contentDiv.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })
    }
  })
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/xcode.min.css"
  />
</svelte:head>

TODO set the tab title

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
</style>
