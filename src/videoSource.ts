import { findQueryParameterValue } from "./queryParameters"
import { isYouTubeVideoIdentifier, normalizeYouTubeVideoIdentifier } from "./youtubeEmbed"

const YOUTUBE_VIDEO_PATHNAMES = ["/shorts/", "/embed/", "/live/"] as const

export const createWatchPath = (videoIdentifier: string): string =>
  `/watch/?v=${encodeURIComponent(videoIdentifier)}`

export const findYouTubeVideoIdentifierFromPathname = (pathname: string): string => {
  const pathnamePrefix = YOUTUBE_VIDEO_PATHNAMES.find((candidatePathname) =>
    pathname.startsWith(candidatePathname),
  )

  return pathnamePrefix ? pathname.slice(pathnamePrefix.length).split("/")[0] ?? "" : ""
}

export const findYouTubeVideoIdentifierFromUrl = (sourceUrl: URL): string => {
  const watchVideoIdentifier = findQueryParameterValue(
    Object.fromEntries(sourceUrl.searchParams),
    "v",
  )
  const pathnameVideoIdentifier = findYouTubeVideoIdentifierFromPathname(sourceUrl.pathname)
  const shortUrlVideoIdentifier = sourceUrl.hostname === "youtu.be" ? sourceUrl.pathname.slice(1) : ""

  return watchVideoIdentifier || pathnameVideoIdentifier || shortUrlVideoIdentifier
}

export const createUrlFromInput = (sourceText: string, baseUrl: string): URL | undefined => {
  try {
    return new URL(sourceText, baseUrl)
  } catch {
    return undefined
  }
}

export const findYouTubeVideoIdentifierFromInput = (sourceText: string, baseUrl: string): string => {
  const source = normalizeYouTubeVideoIdentifier(sourceText)
  const sourceVideoIdentifier = isYouTubeVideoIdentifier(source) ? source : ""
  const sourceUrl = createUrlFromInput(source, baseUrl)
  const videoIdentifier = sourceUrl ? findYouTubeVideoIdentifierFromUrl(sourceUrl) : source
  const normalizedVideoIdentifier = normalizeYouTubeVideoIdentifier(videoIdentifier)

  return sourceVideoIdentifier || (isYouTubeVideoIdentifier(normalizedVideoIdentifier) ? normalizedVideoIdentifier : "")
}
