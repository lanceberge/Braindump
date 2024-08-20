import { s3Client } from '$lib/aws/s3Client'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const command = new ListObjectsV2Command({
    Bucket: 'braindump-bucket'
  })

  const response = await s3Client.send(command)

  return {
    files: response.Contents?.map((item) => item.Key) ?? []
  }
}
