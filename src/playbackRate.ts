export const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const

export type PlaybackRate = (typeof PLAYBACK_RATES)[number]

export const DEFAULT_PLAYBACK_RATE: PlaybackRate = 1

export const createPlaybackRate = (sourceText: string): PlaybackRate => {
  const sourceNumber = Number(sourceText)
  const playbackRate = PLAYBACK_RATES.find((candidatePlaybackRate) => candidatePlaybackRate === sourceNumber)

  return playbackRate ?? DEFAULT_PLAYBACK_RATE
}
