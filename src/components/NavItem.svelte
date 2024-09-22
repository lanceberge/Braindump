<script lang="ts">
  import { page } from '$app/stores'

  export let href: string
  export let name: string

  $: isActive = href !== '/' ? $page.url.pathname.startsWith(href) : $page.url.pathname === '/'
</script>

<li>
  <a
    {href}
    class="px-3 py-2 rounded-md font-medium transition-colors duration-150 ease-in-out
           text-md block"
    class:text-blue-700={isActive}
    class:bg-blue-100={isActive}
    class:text-gray-700={!isActive}
    class:hover:text-gray-900={!isActive}
    class:hover:bg-gray-200={!isActive}
    on:click
  >
    {name}
  </a>
</li>
