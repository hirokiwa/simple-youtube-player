export const registerServiceWorker = (windowReference: Window): void => {
  if (!("serviceWorker" in windowReference.navigator)) {
    return
  }

  windowReference.addEventListener("load", () => {
    windowReference.navigator.serviceWorker.register("/service-worker.js")
  })
}
