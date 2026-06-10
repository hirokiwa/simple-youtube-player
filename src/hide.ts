import { createLocationValue } from "./locationValue"
import { createPlayerState } from "./playerState"
import {
  applyPlayerState,
  findPlayerMessageElement,
  findVideoElement,
  hidePlayerMessageElement,
  showPlayerMessageElement,
} from "./playerView"
import { findHomeFormElement, findVideoSourceInputElement } from "./homeView"
import { findYouTubeVideoIdentifierFromInput } from "./videoSource"

const VIDEO_IDENTIFIER_QUERY_PARAMETER_NAME = "v"

const updateHidePageUrl = (windowReference: Window, videoIdentifier: string): void => {
  const nextUrl = new URL(windowReference.location.href)

  nextUrl.searchParams.set(VIDEO_IDENTIFIER_QUERY_PARAMETER_NAME, videoIdentifier)
  windowReference.history.pushState(null, "", nextUrl)
}

const applyCurrentPlayerState = (
  windowReference: Window,
  documentReference: Document,
): void => {
  const videoElement = findVideoElement(documentReference)
  const messageElement = findPlayerMessageElement(documentReference)
  const playerState = createPlayerState(createLocationValue(windowReference.location))

  if (playerState.status === "ready" && messageElement) {
    hidePlayerMessageElement(messageElement)
  }

  if (playerState.status === "empty" && messageElement) {
    showPlayerMessageElement(messageElement)
  }

  if (videoElement) {
    applyPlayerState(videoElement, playerState)
  }
}

const createHideFormSubmitHandler =
  (windowReference: Window, documentReference: Document, inputElement: HTMLInputElement) =>
  (event: SubmitEvent): void => {
    event.preventDefault()

    const videoIdentifier = findYouTubeVideoIdentifierFromInput(
      inputElement.value,
      windowReference.location.href,
    )

    if (!videoIdentifier) {
      return
    }

    updateHidePageUrl(windowReference, videoIdentifier)
    applyCurrentPlayerState(windowReference, documentReference)
  }

const initializeHidePage = (windowReference: Window, documentReference: Document): void => {
  const formElement = findHomeFormElement(documentReference)
  const inputElement = formElement ? findVideoSourceInputElement(formElement) : null

  applyCurrentPlayerState(windowReference, documentReference)

  if (formElement && inputElement) {
    formElement.addEventListener(
      "submit",
      createHideFormSubmitHandler(windowReference, documentReference, inputElement),
    )
    windowReference.addEventListener("popstate", () =>
      applyCurrentPlayerState(windowReference, documentReference),
    )
    inputElement.focus()
  }
}

initializeHidePage(window, document)
