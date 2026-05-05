import { createQueryParameterMap, findQueryParameterValue } from "./queryParameters"
import {
  createYouTubeEmbedSource,
  isYouTubeVideoIdentifier,
  normalizeYouTubeVideoIdentifier,
} from "./youtubeEmbed"
import type { LocationValue } from "./locationValue"

export type PlayerState =
  | Readonly<{
      status: "ready"
      source: string
    }>
  | Readonly<{
      status: "empty"
    }>

const YOUTUBE_WATCH_PATHNAMES = ["/watch", "/watch/"] as const
const VIDEO_IDENTIFIER_QUERY_PARAMETER_NAME = "v"

export const createPlayerState = (locationValue: LocationValue): PlayerState => {
  const queryParameterMap = createQueryParameterMap(locationValue.search)
  const videoIdentifier = normalizeYouTubeVideoIdentifier(
    findQueryParameterValue(queryParameterMap, VIDEO_IDENTIFIER_QUERY_PARAMETER_NAME),
  )

  return YOUTUBE_WATCH_PATHNAMES.some((pathname) => pathname === locationValue.pathname) &&
    isYouTubeVideoIdentifier(videoIdentifier)
    ? { status: "ready", source: createYouTubeEmbedSource(videoIdentifier) }
    : { status: "empty" }
}
