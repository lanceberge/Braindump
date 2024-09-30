import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { S3_BUCKET, s3Client } from './aws/s3Client'

const command = new ListObjectsV2Command({
  Bucket: S3_BUCKET
})

const response = await s3Client.send(command)
const filenames = response.Contents?.map((item) => item.Key) ?? []

export const filenameToFilePrefixMap: Map<string, string> = new Map()

for (const filename of filenames) {
  const split: string[] = filename.split('.')
  if (split.at(-1) === 'html') {
    const filePrefix: string = split[0].replaceAll('_', ' ')
    filenameToFilePrefixMap.set(filename, filePrefix)
  }
}
