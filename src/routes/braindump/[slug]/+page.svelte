<script lang="ts">
  import { error } from '@sveltejs/kit';
  import type { PageLoad } from './$types';

  export const load: PageLoad = async ({ params, fetch }) => {
    const response = await fetch(`/s3/${params.slug}.html`);

    if (response.ok) {
      return {
        content: await response.text()
      };
    }

    throw error(404, 'File not found');
  };
</script>

<article>{@html content}</article>
