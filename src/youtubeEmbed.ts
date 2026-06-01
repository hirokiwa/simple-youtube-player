const YOUTUBE_VIDEO_IDENTIFIER_PATTERN = /^[a-zA-Z0-9_-]{11}$/

export const normalizeYouTubeVideoIdentifier = (videoIdentifier: string): string => videoIdentifier.trim()

export const isYouTubeVideoIdentifier = (videoIdentifier: string): boolean =>
  YOUTUBE_VIDEO_IDENTIFIER_PATTERN.test(videoIdentifier)

export const createYouTubeEmbedSource = (videoIdentifier: string): string =>
  `https://www.youtube.com/embed/${encodeURIComponent(videoIdentifier)}?autoplay=1&playsinline=1&rel=0&enablejsapi=1`
