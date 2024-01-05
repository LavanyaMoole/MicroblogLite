(function () {
  const doc = document
  const rootEl = doc.documentElement
  const body = doc.body

  window.addEventListener('load', function () {
    body.classList.add('is-loaded')
  })
}())
