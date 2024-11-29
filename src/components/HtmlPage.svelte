<script lang="ts">
  import { onMount, afterUpdate } from 'svelte'
  import { browser } from '$app/environment'
  import hljs from 'highlight.js/lib/common'

  export let title: string
  export let content: string

  let headings: Array<{ id: string; text: string; level: number }> = []
  let activeId = ''
  let headingElements: HTMLElement[] = []

  function updateHeadings() {
    headingElements = Array.from(
      document.querySelectorAll('.loaded-content h1, .loaded-content h2')
    )
    headings = headingElements
      .map((elem) => ({
        id: elem.id || '',
        text: elem.textContent || '',
        level: Number(elem.nodeName.charAt(1))
      }))
      .filter((heading) => heading.id !== '') // Filter out headings without IDs
  }

  function handleScroll() {
    if (browser) {
      const headingPositions = headingElements.map((elem) => ({
        id: elem.id,
        top: elem.getBoundingClientRect().top
      }))
      const currentHeading =
        headingPositions.find((heading) => heading.top > 0) ||
        headingPositions[headingPositions.length - 1]
      if (currentHeading) {
        activeId = currentHeading.id
      }
    }
  }

  function scrollToHeading(id: string) {
    if (browser) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (browser) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  })

  afterUpdate(() => {
    if (browser) {
      updateHeadings()
      handleScroll() // Update active heading after content changes
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
  <title>{title}</title>

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/xcode.min.css"
  />
</svelte:head>

<!-- HTML Content -->
<div class="flex-1 overflow-y-auto">
  <div class="py-4 px-6 md:py-6 md:px-8 max-w-full">
    <h1 class="text-4xl font-bold my-6">{title}</h1>
    <div class="loaded-content prose overflow-wrap-normal">
      {@html content}
    </div>
  </div>
</div>

<!-- Table of Contents -->
<nav
  class="hidden lg:block flex-shrink-0 w-64 sticky py-4 px-6 md:py-6 md:px-8
         bg-white overflow-y-auto top-0 h-screen"
>
  <h3 class="text-lg font-bold mb-2">Table of Contents</h3>
  <ul class="space-y-2">
    {#each headings as heading}
      <li>
        <a
          href="#{heading.id}"
          class="block {heading.level === 1 ? 'text-lg' : 'pl-4'}
                   {activeId === heading.id
            ? 'text-blue-600'
            : 'text-gray-700 hover:text-blue-600'}"
          on:click|preventDefault={(e) => {
            e.preventDefault()
            scrollToHeading(heading.id)
          }}
        >
          {heading.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  :global(.loaded-content) {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    @apply text-wrap;
    @apply break-words;
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

  :global(.loaded-content p) {
    @apply py-4;
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
    @apply text-3xl my-6 font-bold;
  }

  :global(.loaded-content h2) {
    @apply text-2xl my-6 font-semibold;
  }

  :global(.loaded-content h3) {
    @apply text-xl my-6 font-medium;
  }

  :global(.loaded-content h4) {
    @apply text-lg my-6;
  }

  :global(.loaded-content h5) {
    @apply text-sm my-6;
  }

  :global(.loaded-content h6) {
    @apply my-6;
  }

  :global(.loaded-content li) {
    @apply my-2;
  }

  :global(.loaded-content a) {
    @apply text-blue-700;
  }
</style>
