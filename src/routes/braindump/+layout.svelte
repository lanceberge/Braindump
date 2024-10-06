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
<div class="flex flex-row w-screen">
  <!-- Sidebar for desktop -->
  <nav
    class="hidden md:block w-64 bg-gray-100 p-4
           overflow-y-auto sticky top-0 flex-shrink-0 h-screen"
  >
    <!-- List of all pages -->
<h2 class="text-lg font-semibold mb-4">Pages</h2>
  <ul class="space-y-2">
    {#each data.filenamesAndFilePrefixes as [filename, filePrefix]}
      <NavItem href="/braindump/{filename}" name={filePrefix} />
    {/each}
  </ul>
</nav>

<!-- Mobile menu button -->
<button
  class="md:hidden fixed top-4 left-4 z-20 bg-gray-200 p-2 rounded"
  on:click={toggleMobileMenu}
>
  {isMobileMenuOpen ? '✕' : '☰'}
</button>

<!-- Sidebar for mobile -->
{#if isMobileMenuOpen}
  <nav class="md:hidden fixed inset-0 bg-gray-100 p-4 z-10 overflow-y-auto">
    <h2 class="text-lg font-semibold mb-4">Pages</h2>
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
