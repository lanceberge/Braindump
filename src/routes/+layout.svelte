<script lang="ts">
  import '../app.css'
</script>

<nav class="bg-gray-100 p-4">
  <div class="max-w-3xl mx-auto">
    <ul class="flex space-x-4">
      <li>
        <a
          href="/"
          class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a
        >
      </li>
    </ul>
  </div>
</nav>

<main>
  <div class="max-w-3xl mx-auto p-4">
    <slot />
  </div>
</main>

<style>
  .main-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
</style>
