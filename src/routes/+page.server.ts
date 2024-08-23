import { s3Client } from '$lib/aws/s3Client'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const command = new ListObjectsV2Command({
    Bucket: 'braindump-bucket'
  })

  const response = await s3Client.send(command)

  const filesSet: Set<string> = new Set()
  const filePrefixes: string[] = []

  const filenames = response.Contents?.map((item) => item.Key) ?? []
  for (const filename of filenames) {
    const split: string[] = filename.split('.')
    if (split.at(-1) === 'html') {
      filesSet.add(filename)
      filePrefixes.push(split[0])
    }
  }

  // TODO replace all _ with spaces. Then we'll need to return as map of filename: link
  return {
    files: filePrefixes
  }
}
