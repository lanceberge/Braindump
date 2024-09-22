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

<!-- HTML Content -->
<div class="flex-1 p-4 overflow-x-auto">
  <h1 class="text-4xl font-bold my-3">{data.filePrefix}</h1>
  <div class="loaded-content break-words hyphens-none text-wrap">
    {@html data.content}
  </div>
</div>

<!-- Table of Contents -->
<nav
  class="hidden lg:block flex-shrink-0 w-64 sticky p-4
         bg-white overflow-y-auto top-0 h-screen"
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
