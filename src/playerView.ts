import type { PlayerState } from "./playerState"

export const findVideoElement = (documentReference: Document): HTMLIFrameElement | null =>
  documentReference.querySelector<HTMLIFrameElement>(".watch-page__video")

export const findPlayerMessageElement = (documentReference: Document): HTMLElement | null =>
  documentReference.querySelector<HTMLElement>(".watch-page__message")

export const setVideoSource = (videoElement: HTMLIFrameElement, source: string): void => {
  videoElement.src = source
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
    ? setVideoSource(videoElement, playerState.source)
    : hideVideoElement(videoElement)
