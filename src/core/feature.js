import elementReady from 'element-ready'
import { log } from './utils'

const feature = () => {
  const add = async ({ selector, init }) => {
    // await waitOnChat()
    log('info', 'done waiting')
    const element = await elementReady(selector || 'body')

    if (!element) {
      return
    }

    if (typeof init !== 'function') {
      log(`init must be a function, but was passed ${typeof init} instead. Aborting.`)
    }

    try {
      const result = await init(element)
      if (result) {
        log(`✅`, `feature loaded successfully.`)
      }
      log(`⚠️`, `init completed with warnings`)
    } catch (e) {
      log(`❌`, `init failed with the following error: ${e.toString()}`)
    }
  }

  return {
    add,
  }
}

export { feature }
