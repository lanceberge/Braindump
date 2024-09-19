<script lang="ts">
  import type { PageData } from './$types'
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'

  export let data: PageData

  interface Heading {
    id: string
    text: string
    level: number
    element: HTMLElement
  }

  let headings: Heading[] = []

  function loadHeadings() {
    const headingElements = Array.from(
      document.querySelectorAll('.loaded-content h1, .loaded-content h2')
    ) as HTMLElement[]
    headings = headingElements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || '',
      level: Number(elem.nodeName.charAt(1)),
      element: elem
    }))
  }

  function scrollToHeading(id: string) {
    const heading = headings.find((h) => h.id === id)
    if (heading) {
      heading.element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  onMount(() => {
    if (browser) {
      loadHeadings()
    }
  })
</script>

<svelte:head>
  <title>{data.filePrefix}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row">
  <div class="flex-grow">
    <h1 class="text-4xl font-bold my-3">{data.filePrefix}</h1>
    <div class="loaded-content max-w-none prose prose-sm sm:prose lg:prose-lg">
      {@html data.content}
    </div>
  </div>
  <nav
    class="table-of-contents hidden lg:block sticky top-20 right-4 p-4 bg-white shadow-lg rounded-lg max-w-xs ml-4 h-fit"
  >
    <h3 class="text-lg font-bold mb-2">Table of Contents</h3>
    <ul class="space-y-2">
      {#each headings as heading}
        <li>
          <a
            href="#{heading.id}"
            class="block {heading.level === 1 ? 'font-bold' : 'pl-4'}
              text-gray-700 hover:text-blue-600"
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
</style>
