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
