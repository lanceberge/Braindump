<script lang="ts">
  import hljs from 'highlight.js'

  // Load any languages you need
  import javascript from 'highlight.js/lib/languages/javascript'
  import { onMount } from 'svelte'

  // Then register the languages you need
  hljs.registerLanguage('javascript', javascript)

  onMount(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css">
</svelte:head>

<slot />
