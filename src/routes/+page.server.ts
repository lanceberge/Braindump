import type { PageServerLoad } from './$types'
import { filenameToFilePrefixMap } from '$lib/filenameToPrefixMap'

export const load: PageServerLoad = async () => {
  return {
    filenamesAndFilePrefixes: Array.from(filenameToFilePrefixMap.entries())
  }
}
