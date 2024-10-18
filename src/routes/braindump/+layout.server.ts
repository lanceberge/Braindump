import { getFilenameToPrefixMap } from '$lib/filenameToPrefixMap'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return {
    filenamesAndFilePrefixes: Array.from((await getFilenameToPrefixMap()).entries())
  }
}
