import { S3_BUCKET, S3_IMAGE_PREFIX, s3Client } from '$lib/aws/s3Client'
import { GetObjectCommand, type GetObjectCommandOutput } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { getFilenameToPrefixMap } from '$lib/filenameToPrefixMap'

export const load: PageServerLoad = async ({ params }) => {
  const filename: string = params.slug

  const filenameToFilePrefixMap: Map<string, string> = await getFilenameToPrefixMap()

  if (!filenameToFilePrefixMap.has(filename)) {
    throw error(500, 'File not found')
  }

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: filename
  })

  try {
    const response: GetObjectCommandOutput = await s3Client.send(command)

    if (!response.Body) {
      throw error(404, 'File not found')
    }

    const body: string = await response.Body.transformToString()

    // substitute the org-roam id links for links to the routes
    const content = body.replace(
      /(href="id:[^"]*">([^<]*))|(<img src="img\/)|(<a href="(https?:\/\/[^"]+)">(.*?)<\/a>)/g,
      (match, idHref, idContent, imgSrc, extLink, extHref, extContent) => {
        if (idHref) {
          // Make id links route internally
          const newContent = idContent.replace(/[\s\n]/g, '_')
          return `href="/braindump/${newContent}.html">${idContent}`
        } else if (imgSrc) {
          // Add s3 prefix to images
          return `<img loading="lazy" src="${S3_IMAGE_PREFIX}`
        } else if (extLink) {
          // Handle external links
          return `<a href="${extHref}"> ext: ${extContent}</a>`
        }

        return match
      }
    )

    return {
      filePrefix: filenameToFilePrefixMap.get(filename),
      content
    }
  } catch (err) {
    throw error(500, 'Error fetching the file')
  }
}
