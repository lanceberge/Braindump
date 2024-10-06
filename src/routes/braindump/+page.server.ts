import { promises as fs } from 'fs'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  try {
    const content = await fs.readFile('static/braindump/explanation.html', 'utf8')
    return {
      content
    }
  } catch (err) {
    console.error('Failed to read file:', err)
    throw error(500, 'Failed to load content')
  }
}
