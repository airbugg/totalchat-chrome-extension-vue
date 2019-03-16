import elementReady from 'element-ready'
import onChange from 'on-change'

export const ACTION_TYPES = {
  EXECUTE: 'EXECUTE',
  EXECUTE_START: 'EXECUTE_START',
  EXECUTE_FAILED: 'EXECUTE_FAILED',
  EXECUTE_SUCCESS: 'EXECUTE_SUCCESS',
  API_READY: 'API_READY',
}
const debugMode = process.env.NODE_ENV === 'development'

const roundedRandom = (say, when) => Math.floor(when ? say : 0 + Math.random() * (when || say))

export const log = (severity, content) => {
  const args = [`%c[${severity}]\t%c${content}`, 'font-weight: bold;', '']
  return debugMode ? console.log(...args) : () => {}
}

export const random = (arr = []) => arr[roundedRandom(arr.length)]

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const fiegnHumanity = ms => sleep(roundedRandom(100, ms || 500))

export const updateAuNausum = (selector, value) =>
  new Promise(async resolve => {
    const element = await elementReady(selector)
    const enough = setInterval(() => {
      if (!element || element.value === value) {
        clearInterval(enough)
        resolve()
      }
      element.value = value
    }, roundedRandom(225))
  })

export const injectScript = file => {
  var s = document.createElement('script')
  s.setAttribute('type', 'text/javascript')
  s.setAttribute('src', file)
  s.setAttribute('id', 'injected-script-yo-look-here')
  document.documentElement.appendChild(s)
}
export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

export function waitUntilDefined(context, varName, callback) {
  if (!context.hasOwnProperty(varName)) {
    Object.defineProperty(window, varName, {
      configurable: true,
      enumerable: true,
      get: function() {
        return this._obj
      },
      set: function(val) {
        this._obj = onChange(val, callback)
      },
    })
  }
}
