<script lang="ts">
  import type { PageData } from './$types'
  import { onMount } from 'svelte'
  import NavItem from '$components/NavItem.svelte'

  export let data: PageData

  let isMobileMenuOpen = false
  let isDesktop = false

  onMount(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    isDesktop = mediaQuery.matches
    mediaQuery.addEventListener('change', (e) => (isDesktop = e.matches))
  })

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen
  }
</script>

<!-- Main content container -->
<div class="flex flex-col md:flex-row w-screen">
  <!-- Sidebar for desktop -->
  <nav
    class="hidden md:block w-64 bg-gray-100 py-6 px-8
           overflow-y-auto sticky top-0 flex-shrink-0 h-screen"
  >
    <!-- List of all pages -->
    <a href="/braindump" class="block">
      <h2 class="text-lg font-semibold mb-4 hover:text-blue-600">Pages</h2>
    </a>
    <ul class="space-y-2">
      {#each data.filenamesAndFilePrefixes as [filename, filePrefix]}
        <NavItem href="/braindump/{filename}" name={filePrefix} />
      {/each}
    </ul>
  </nav>

  <!-- Mobile menu button -->
  <button class="md:hidden bg-gray-200 m-2 p-2 w-fit rounded" on:click={toggleMobileMenu}>
    {isMobileMenuOpen ? '✕' : '☰'}
  </button>

  <!-- Sidebar for mobile -->
  {#if isMobileMenuOpen}
    <nav class="md:hidden bg-gray-100 p-4 z-10 overflow-y-auto">
      <a href="/braindump" class="block">
        <h2 class="text-lg font-semibold mb-4 hover:text-blue-600">Pages</h2>
      </a>
      <ul class="space-y-2">
        {#each data.filenamesAndFilePrefixes as [filename, filePrefix]}
          <NavItem
            href="/braindump/{filename}"
            name={filePrefix}
            on:click={() => (isMobileMenuOpen = false)}
          />
        {/each}
      </ul>
    </nav>
  {/if}

  <slot />
</div>
