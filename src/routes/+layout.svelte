<script lang="ts">
  import '../app.css'
</script>

<main>
  <div class="main-page">
    <slot />
  </div>
</main>

<style>
  .main-page {
    max-width: 800px; /* Set the maximum width you want */
    margin: 0 auto; /* Center the content */
    padding: 1rem; /* Add padding around the content */
  }
</style>
