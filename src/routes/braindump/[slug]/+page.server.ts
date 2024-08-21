import { s3Client } from '$lib/aws/s3Client'
import { GetObjectCommand, type GetObjectCommandOutput } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'
import { AWS_BUCKET_NAME } from '$env/static/private'
import { error } from '@sveltejs/kit'

// TODO prevent this from being called if the page was already loaded
export const load: PageServerLoad = async ({ params }) => {
  // TODO find if the file is cached in the CDN

  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,

    // TODO make sure you can only find things that are fetched from s3 already
    // the routes that aren't already fetched should be in a hashset and checked for there
    Key: params.slug
  })

  try {
    const response: GetObjectCommandOutput = await s3Client.send(command)

    if (!response.Body) {
      throw error(404, 'File not found')
    }

    // const content = await streamToString(response.Body as ReadableStream)
    const content: string = await response.Body.transformToString()
    return { content }
  } catch (err) {
    console.log(err)
    throw error(500, 'Error fetching the file')
  }
}
