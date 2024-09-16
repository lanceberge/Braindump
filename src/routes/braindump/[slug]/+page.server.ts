import { S3_IMAGE_PREFIX, s3Client } from '$lib/aws/s3Client'
import { GetObjectCommand, type GetObjectCommandOutput } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'
import { AWS_BUCKET_NAME } from '$env/static/private'
import { error } from '@sveltejs/kit'
import { filenameToFilePrefixMap } from '$lib/filenameToPrefixMap'

export const load: PageServerLoad = async ({ params }) => {
  const filename: string = params.slug

  if (!filenameToFilePrefixMap.has(filename)) {
    // TODO redirect
    throw error(500, 'File not found')
  }

  // TODO find if the file is cached in the CDN
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,

    Key: filename
  })

  try {
    const response: GetObjectCommandOutput = await s3Client.send(command)

    if (!response.Body) {
      throw error(404, 'File not found')
    }

    const body: string = await response.Body.transformToString()

    // substitute the org-roam id links for links to the routes
    const content = body
      .replace(/href="id:[^"]*">([^<]*)/g, (_, p1) => {
        // convert to lowercase and replace spaces or newlines (the line gets split) with _
        return `href="/braindump/${p1.replace(/[\s\n]/g, '_')}.html">${p1}`
      })
      // Pandoc converts the images to use the local paths. We need to find them
      // from our s3 bucket. So we insert the S3_IMAGE_PREFIX to the links
      .replace(/img src="img\//g, `img loading="lazy" src="${S3_IMAGE_PREFIX}`)

    return { content }
  } catch (err) {
    console.log(err)
    throw error(500, 'Error fetching the file')
  }
}
