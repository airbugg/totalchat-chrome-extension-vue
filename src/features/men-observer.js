import { feature } from '../core/feature'

const init = async usersPanel => {
  const observer = new MutationObserver(mutations =>
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.childNodes[0].classList.contains('male')) {
            node.remove()
          }
        })
      }
    })
  )
  const config = { childList: true, subtree: true }

  return observer.observe(usersPanel, config)
}

feature().add({
  selector: '#Room-Users',
  init,
})
