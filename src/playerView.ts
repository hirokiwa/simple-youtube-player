import type { PlayerState } from "./playerState"
import type { PlaybackRate } from "./playbackRate"

type YouTubePlayerCommand = Readonly<{
  event: "command"
  func: "setPlaybackRate"
  args: readonly [PlaybackRate]
}>

const PLAYBACK_RATE_COMMAND_DELAYS = [250, 750, 1500] as const

export const findVideoElement = (documentReference: Document): HTMLIFrameElement | null =>
  documentReference.querySelector<HTMLIFrameElement>(".watch-page__video")

export const findPlayerMessageElement = (documentReference: Document): HTMLElement | null =>
  documentReference.querySelector<HTMLElement>(".watch-page__message")

export const setVideoSource = (videoElement: HTMLIFrameElement, source: string): void => {
  videoElement.src = source
}

export const createSetPlaybackRateCommand = (
  playbackRate: PlaybackRate,
): YouTubePlayerCommand => ({
  event: "command",
  func: "setPlaybackRate",
  args: [playbackRate],
})

export const serializePlayerCommand = (command: YouTubePlayerCommand): string =>
  JSON.stringify(command)

export const postPlayerCommand = (
  videoElement: HTMLIFrameElement,
  command: YouTubePlayerCommand,
): void => {
  videoElement.contentWindow?.postMessage(serializePlayerCommand(command), "https://www.youtube.com")
}

export const schedulePlaybackRateCommand = (
  videoElement: HTMLIFrameElement,
  playbackRate: PlaybackRate,
): void => {
  const command = createSetPlaybackRateCommand(playbackRate)

  PLAYBACK_RATE_COMMAND_DELAYS.forEach((delay) =>
    window.setTimeout(() => postPlayerCommand(videoElement, command), delay),
  )
}

export const bindPlaybackRateCommand = (
  videoElement: HTMLIFrameElement,
  playbackRate: PlaybackRate,
): void => {
  videoElement.addEventListener(
    "load",
    () => schedulePlaybackRateCommand(videoElement, playbackRate),
    { once: true },
  )
}

export const applyReadyPlayerState = (
  videoElement: HTMLIFrameElement,
  playerState: Extract<PlayerState, { status: "ready" }>,
): void => {
  bindPlaybackRateCommand(videoElement, playerState.playbackRate)
  setVideoSource(videoElement, playerState.source)
}

export const hideVideoElement = (videoElement: HTMLIFrameElement): void => {
  videoElement.hidden = true
}

export const hidePlayerMessageElement = (messageElement: HTMLElement): void => {
  messageElement.hidden = true
}

export const applyPlayerState = (
  videoElement: HTMLIFrameElement,
  playerState: PlayerState,
): void =>
  playerState.status === "ready"
    ? applyReadyPlayerState(videoElement, playerState)
    : hideVideoElement(videoElement)
