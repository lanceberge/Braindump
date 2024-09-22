<script lang="ts">
  import { browser } from '$app/environment'
  import hljs from 'highlight.js/lib/common'
  import { afterUpdate } from 'svelte'

  afterUpdate(() => {
    if (browser) {
      const contentDiv = document.querySelector('.loaded-content')
      if (contentDiv) {
        contentDiv.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block as HTMLElement)
        })
      }
    }
  })
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/xcode.min.css"
  />
</svelte:head>

<slot />

<style>
  :global(.loaded-content) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline;
    max-width: 100%;
  }

  :global(.loaded-content li) {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
    padding-left: 0.5em;
    text-indent: -0.5em;
  }

  :global(.loaded-content li p) {
    display: inline;
  }

  :global(.loaded-content ul) {
    list-style-position: outside;
    padding-left: 1.5em;
    @apply list-disc list-inside pl-6;
  }

  :global(.loaded-content li) {
    @apply pl-2 -indent-2;
  }

  :global(.loaded-content table) {
    @apply border-collapse w-full;
  }

  :global(.loaded-content th),
  :global(.loaded-content td) {
    @apply border-b border-gray-300 p-2 text-left;
  }

  :global(.loaded-content tr td) {
    @apply border-r border-gray-300;
  }

  :global(.loaded-content tr:nth-child(even)) {
    @apply bg-gray-100;
  }

  :global(.loaded-content pre) {
    max-width: 100%;
    overflow-x: auto;
  }

  :global(.loaded-content code) {
    white-space: pre;
    word-wrap: normal;
    @apply bg-slate-100 rounded-md p-1;
  }

  :global(.loaded-content li) {
    @apply my-1;
  }

  :global(.loaded-content h1) {
    @apply text-3xl my-3;
  }

  :global(.loaded-content h2) {
    @apply text-2xl my-3;
  }

  :global(.loaded-content h3) {
    @apply text-xl my-3;
  }

  :global(.loaded-content h4) {
    @apply text-lg my-3;
  }

  :global(.loaded-content h5) {
    @apply text-sm my-3;
  }

  :global(.loaded-content h6) {
    @apply my-3;
  }

  :global(.loaded-content li) {
    @apply my-1;
  }

  :global(.loaded-content a) {
    @apply text-blue-700;
  }
</style>
