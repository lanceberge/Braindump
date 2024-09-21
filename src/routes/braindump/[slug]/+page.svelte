<script lang="ts">
  import type { PageData } from './$types'
  import { onMount, afterUpdate } from 'svelte'
  import { browser } from '$app/environment'
  import { page } from '$app/stores'

  export let data: PageData

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
    }
  })
</script>

<svelte:head>
  <title>{data.filePrefix}</title>
</svelte:head>

<div class="p-4 flex lg:flex-row max-w-full">
  <!-- HTML Content -->
  <div class="flex-grow overflow-x-auto">
    <h1 class="text-4xl font-bold my-3">{data.filePrefix}</h1>
    <div class="loaded-content break-words hyphens-none text-wrap overflow-x-auto max-w-full">
      {@html data.content}
    </div>
  </div>

  <!-- Table of Contents -->
  <div class="flex relative lg:block flex-shrink-0">
    <nav
      class="table-of-contents hidden lg:block sticky p-4 bg-white
             shadow-lg rounded-lg ml-4 w-64 h-fit overflow-y-auto h-screen
             flex-shrink-0"
    >
      <h3 class="text-lg font-bold mb-2">Table of Contents</h3>
      <ul class="space-y-2">
        {#each headings as heading}
          <li>
            <a
              href="#{heading.id}"
              class="block {heading.level === 1 ? 'font-bold' : 'pl-4'}
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
  </div>
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
    padding-left: 0.5em;
    text-indent: -0.5em;
  }

  .loaded-content :global(li p) {
    display: inline;
  }

  .loaded-content :global(ul) {
    list-style-position: outside;
    padding-left: 1.5em;
  }

  :global(.loaded-content ul) {
    @apply list-outside pl-6;
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
  .loaded-content :global(pre) {
    max-width: 100%;
    overflow-x: auto;
  }

  .loaded-content :global(code) {
    white-space: pre;
    word-wrap: normal;
  }
</style>
