import { s3Client } from '$lib/aws/s3Client'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'
import { AWS_BUCKET_NAME } from '$env/static/private'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params }) => {
  // TODO find if the file is cached in the CDN

  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,

    // TODO make sure you can only find things that are fetched from s3 already
    // the routes that aren't already fetched should be in a hashset and checked for there
    Key: params.slug // Assuming the slug matches the file key in S3
  })

  try {
    const response = await s3Client.send(command)

    if (!response.Body) {
      throw error(404, 'File not found')
    }

    const content = await streamToString(response.Body as ReadableStream)
    return { content }
  } catch (err) {
    console.log(err)
    throw error(500, 'Error fetching the file')
  }
}

async function streamToString(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader()
  const decoder = new TextDecoder('utf-8')
  let result = ''
  let done = false

  while (!done) {
    const { value, done: streamDone } = await reader.read()
    done = streamDone
    if (value) {
      result += decoder.decode(value, { stream: true })
    }
  }

  result += decoder.decode() // End the decoding
  return result
}
