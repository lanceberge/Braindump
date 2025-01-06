import { S3_BUCKET, S3_IMAGE_PREFIX, s3Client } from '$lib/aws/s3Client'
import { GetObjectCommand, type GetObjectCommandOutput } from '@aws-sdk/client-s3'
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { getFilenameToPrefixMap } from '$lib/filenameToPrefixMap'

function escapeRegex(pattern: string): string {
  return pattern.replace(/\//g, '\\/')
}

/**
 * Substitute the org-roam links so that they route at /braindump
 * Substitute the images to find the images in S3
 * Substitute external links so they have an ext: prefix to discern them
 * from the org-roam links
 */
function formatBodyContent(body: string): string {
  // substitute the org-roam id links for links to the routes
  const idHrefPattern = 'href="id:.*?">([^<]*)'
  const imgSrcPattern = escapeRegex('<img src="img/')
  const extLinkPattern = escapeRegex('<a href="(https?://.*?)">(.*?)</a>')

  const bodyPattern = new RegExp(`(${idHrefPattern})|(${imgSrcPattern})|(${extLinkPattern})`, 'g')

  const content = body.replace(
    bodyPattern,
    (match, idHrefMatch, idContent, imgSrcMatch, extLinkMatch, extHref, extContent) => {
      if (idHrefMatch) {
        // Make id links route internally
        const newContent = idContent.replace(/[\s\n]/g, '_')
        return `href="/braindump/${newContent}.html">${idContent}`
      } else if (imgSrcMatch) {
        // Add s3 prefix to images
        return `<img loading="lazy" src="${S3_IMAGE_PREFIX}`
      } else if (extLinkMatch) {
        // Handle external links
        return `<a href="${extHref}"> ext: ${extContent}</a>`
      }

      return match
    }
  )
  return content
}

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
    const content: string = formatBodyContent(body)

    return {
      filePrefix: filenameToFilePrefixMap.get(filename),
      content
    }
  } catch (err) {
    throw error(500, 'Error fetching the file')
  }
}
