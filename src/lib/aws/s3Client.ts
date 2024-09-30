import { S3Client } from '@aws-sdk/client-s3'

import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '$env/dynamic/private'

export const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
})

export const S3_BUCKET: string = 'braindump-bucket'

export const S3_IMAGE_PREFIX: string = `https://${S3_BUCKET}.s3.us-east-2.amazonaws.com/img/`
