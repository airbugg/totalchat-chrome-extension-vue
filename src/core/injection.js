import _ from 'lodash'
import domLoaded from 'dom-loaded'
import { log, sleep, waitUntilDefined } from './utils'

const reply = (id, result) => {
  log(location.href, `replying to ${id} with result: ${result}`)
  return window.postMessage(
    {
      id,
      type: 'reply',
      payload: result,
    },
    '*'
  )
}
;(async function initialize() {
  waitUntilDefined(window, 'Handlers')
  // waitUntilDefined(window, 'chatCore')

  window.addEventListener('message', async ({ data }) => {
    const { id, type, payload } = data
    if (!payload || !payload.paths) {
      return
    }
    let result
    switch (type) {
      case 'reply':
        return
      case 'get':
        payload.paths.forEach(async ({ path }) => {
          await sleep(1000)
          result = _.get(window, path)
        })
        reply(id, result)

        break
      case 'apply':
        payload.paths.forEach(async ({ path, args = [] }) => {
          await sleep(1000)
          result = _.get(window, path)(...args)
        })
        break
      default:
    }
  })
})()
