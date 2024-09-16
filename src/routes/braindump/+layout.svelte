<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'

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

<div class="flex relative">
  <!-- Sidebar for desktop -->
  <nav class="hidden md:block w-64 bg-gray-100 p-4 overflow-y-auto h-screen sticky top-0">
    <h2 class="text-lg font-semibold mb-4">Pages</h2>
    <ul class="space-y-2">
      {#each data.filenamesAndFilePrefixes as [filename, filePrefix]}
        <li>
          <a
            href="/braindump/{filename}"
            class="block hover:bg-gray-200 p-2 rounded"
            class:bg-blue-200={$page.url.pathname === `/braindump/${filename}`}
          >
            {filePrefix}
          </a>
        </li>
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
          <li>
            <a
              href="/braindump/{filename}"
              class="block hover:bg-gray-200 p-2 rounded"
              class:bg-blue-200={$page.url.pathname === `/braindump/${filename}`}
              on:click={() => (isMobileMenuOpen = false)}
            >
              {filePrefix}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}

  <div class="flex-1 p-4 md:w-4/5">
    <slot />
  </div>
</div>
