import { s3Client } from '$lib/aws/s3Client'
import { GetObjectCommand, type GetObjectCommandOutput } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'
import { AWS_BUCKET_NAME } from '$env/static/private'
import { error } from '@sveltejs/kit'
import { filenameToFilePrefixMap } from '$lib/filenameToPrefixMap'

export const load: PageServerLoad = async ({ params }) => {
  const filename: string = params.slug

  if (!filenameToFilePrefixMap.has(filename)) {
    // TODO redirect?
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

    // TODO get images to work
    const body: string = await response.Body.transformToString()

    // substitute the org-roam id links for links to the routes
    const content = body.replace(/href="id:[^"]*">([^<]*)/g, (_, p1) => {
      // TODO configure links to load on hover
      // convert to lowercase and replace spaces or newlines (the line gets split) with _
      return `href="/braindump/${p1.replace(/[\s\n]/g, '_')}.html">${p1}`
    })

    return { content }
  } catch (err) {
    console.log(err)
    throw error(500, 'Error fetching the file')
  }
}
