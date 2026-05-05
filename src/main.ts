import {
  bindHomeFormSubmit,
  createHomeFormSubmitHandler,
  findHomeFormElement,
  findVideoSourceInputElement,
} from "./homeView"

const initializeHomePage = (windowReference: Window, documentReference: Document): void => {
  const formElement = findHomeFormElement(documentReference)
  const inputElement = formElement ? findVideoSourceInputElement(formElement) : null

  return formElement && inputElement
    ? bindHomeFormSubmit(formElement, inputElement, createHomeFormSubmitHandler(windowReference, inputElement))
    : undefined
}

initializeHomePage(window, document)
