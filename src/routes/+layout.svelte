<script lang="ts">
  import '../app.css'
  import NavItem from '$components/NavItem.svelte'
</script>

<!-- Top Nav Bar -->
<nav class="bg-gray-100 px-4 py-2">
  <div class="max-w-3xl mx-auto">
    <ul class="flex space-x-1">
      <NavItem href="/" name="Home" />
      <NavItem href="/braindump" name="Braindump" />
      <NavItem href="/projects" name="Projects" />
    </ul>
  </div>
</nav>

<main>
  <slot />
</main>
