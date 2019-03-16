import { injectScript, log } from '../core/utils'

log('features/inject', 'about to inject script')
injectScript(chrome.extension.getURL('injection.js'), 'body')
log('features/inject', 'done injecting script')
