import { fromEvent } from 'rxjs'
import _ from 'lodash'
import { map, filter } from 'rxjs/operators'
import { uuidv4 } from './utils'

function createMessage(type, pathOrPaths) {
  return {
    id: `${uuidv4()}`,
    type,
    payload: { paths: _.isArray(pathOrPaths) ? pathOrPaths : [pathOrPaths] },
  }
}

const windowMessageStream$ = fromEvent(window, 'message')

const request = (type, ...paths) => {
  const outgoingMsg = createMessage(type, paths)
  return new Promise(resolve => {
    windowMessageStream$
      .pipe(
        map(({ data }) => data),
        filter(({ id, type }) => id === outgoingMsg.id && type === 'reply')
      )
      .subscribe(incomingMsg => {
        resolve(incomingMsg.payload)
      })

    window.postMessage(outgoingMsg, '*')
  })
}
export const isLoggedIn = () => request('get', { path: 'chatCore.loggedin' })
export const logIn = () =>
  request(
    'apply',
    { path: 'Handlers.GUIHanlder.LoginClick' },
    { path: 'GUI.popUp.Hide', args: ['start-popup'] }
  )
