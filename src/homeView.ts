import { createWatchPath, findYouTubeVideoIdentifierFromInput } from "./videoSource"

export const findHomeFormElement = (documentReference: Document): HTMLFormElement | null =>
  documentReference.querySelector<HTMLFormElement>(".home-page__form")

export const findVideoSourceInputElement = (
  formElement: HTMLFormElement,
): HTMLInputElement | null => formElement.querySelector<HTMLInputElement>(".home-page__input")

export const redirectToWatchPage = (
  windowReference: Window,
  videoIdentifier: string,
): void => {
  windowReference.location.href = createWatchPath(videoIdentifier)
}

export const createHomeFormSubmitHandler =
  (windowReference: Window, inputElement: HTMLInputElement) =>
  (event: SubmitEvent): void => {
    event.preventDefault()

    const videoIdentifier = findYouTubeVideoIdentifierFromInput(
      inputElement.value,
      windowReference.location.href,
    )

    return videoIdentifier ? redirectToWatchPage(windowReference, videoIdentifier) : undefined
  }

export const bindHomeFormSubmit = (
  formElement: HTMLFormElement,
  inputElement: HTMLInputElement,
  handler: (event: SubmitEvent) => void,
): void => {
  formElement.addEventListener("submit", handler)
  inputElement.focus()
}
