import { createLocationValue } from "./locationValue"
import { createPlayerState } from "./playerState"
import {
  applyPlayerState,
  findPlayerMessageElement,
  findVideoElement,
  hidePlayerMessageElement,
} from "./playerView"

const initializeWatchPage = (windowReference: Window, documentReference: Document): void => {
  const videoElement = findVideoElement(documentReference)
  const messageElement = findPlayerMessageElement(documentReference)
  const playerState = createPlayerState(createLocationValue(windowReference.location))

  if (playerState.status === "ready" && messageElement) {
    hidePlayerMessageElement(messageElement)
  }

  return videoElement ? applyPlayerState(videoElement, playerState) : undefined
}

initializeWatchPage(window, document)
