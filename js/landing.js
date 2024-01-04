(function () {
  const doc = document
  const rootEl = doc.documentElement
  const body = doc.body
  const sr = window.sr = ScrollReveal()

  rootEl.classList.remove('no-js')
  rootEl.classList.add('js')

  window.addEventListener('load', function () {
    body.classList.add('is-loaded')
  })
}())
