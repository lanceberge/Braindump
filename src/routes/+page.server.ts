import { s3Client } from '$lib/aws/s3Client'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const command = new ListObjectsV2Command({
    Bucket: 'braindump-bucket'
  })

  const response = await s3Client.send(command)
  const filenames = response.Contents?.map((item) => item.Key) ?? []

  const filenameToFilePrefixMap: Map<string, string> = new Map()

  for (const filename of filenames) {
    const split: string[] = filename.split('.')
    if (split.at(-1) === 'html') {
      const filePrefix: string = split[0].replaceAll('_', ' ')
      filenameToFilePrefixMap.set(filename, filePrefix)
    }
  }

  return {
    filenamesAndFilePrefixes: Array.from(filenameToFilePrefixMap.entries())
  }
}
