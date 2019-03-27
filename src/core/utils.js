import elementReady from 'element-ready'
import _ from 'lodash'
import DeepProxy from 'proxy-deep'
const debugMode = process.env.NODE_ENV === 'development'

const roundedRandom = (say, when) => Math.floor(when ? say : 0 + Math.random() * (when || say))

export const log = (severity, ...content) => {
  const args = [`%c[${severity}]\t%o`, 'font-weight: bold;', content]
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
  const injection = document.createElement('script')
  injection.setAttribute('type', 'text/javascript')
  injection.setAttribute('src', file)
  injection.setAttribute('id', 'totalchat-chrome-extension')
  document.documentElement.appendChild(injection)
}
export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

export function traceMethodCalls(obj, name) {
  return new DeepProxy(obj, {
    get(target, key, receiver) {
      const val = Reflect.get(target, key, receiver)
      if (typeof val === 'object' && val !== null) {
        return this.nest(val)
      }

      if (typeof val === 'function') {
        log(`${name}.${this.path.join('.')}()`)
        return function(...args) {
          return val.apply(this, args) // (A)
        }
      }
      // log(`${name}.${this.path.join('.')}`, val)

      return val
    },
  })
}

// export function traceMethodCalls(obj, name) {
//   const handler = new Proxy(
//     {},
//     {
//       get(target, trapName, receiver) {
//         // Return the handler method named trapName
//         return function(target, key, receiver) {
//           log(trapName.toUpperCase(), key.toString())
//           // Forward the operation
//           return key === Symbol.toPrimitive && trapName.toUpperCase() !== 'GET'
//             ? Reflect[trapName](target, key, receiver)
//             : receiver
//         }
//       },
//     }
//   )
//   return new Proxy(obj, handler)
// }

export function waitUntilDefined(context, varName) {
  if (!context.hasOwnProperty(varName)) {
    Object.defineProperty(window, varName, {
      enumerable: true,
      get: function() {
        return this._obj
      },
      set: function(val) {
        this._obj = traceMethodCalls(val, varName)
      },
    })
  }
}
