import { S3Client } from '@aws-sdk/client-s3'
import { env } from '$env/dynamic/private'

let s3Client: S3Client | null = null

export function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: env.PRIVATE_AWS_REGION,
      credentials: {
        accessKeyId: env.PRIVATE_AWS_ACCESS_KEY_ID,
        secretAccessKey: env.PRIVATE_AWS_SECRET_ACCESS_KEY
      }
    })
  }

  return s3Client
}

export const S3_BUCKET: string = 'braindump-bucket'
export const S3_IMAGE_PREFIX: string = `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/img/`

console.log('AWS_REGION:', env.AWS_REGION)
console.log('AWS_ACCESS_KEY_ID:', env.AWS_ACCESS_KEY_ID)
console.log('AWS_SECRET_ACCESS_KEY:', env.AWS_SECRET_ACCESS_KEY)
