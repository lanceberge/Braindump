import { S3Client } from '@aws-sdk/client-s3'
import { env } from '$env/dynamic/private'

export const s3Client = new S3Client({
  region: env.AWS_REGION || 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  }
})

export const S3_BUCKET = env.S3_BUCKET || 'braindump-bucket'
export const S3_IMAGE_PREFIX = `https://${S3_BUCKET}.s3.${env.AWS_REGION || 'us-east-2'}.amazonaws.com/img/`
