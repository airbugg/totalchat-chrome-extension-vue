import { feature } from '../core/feature'
import { log, random, updateAuNausum } from '../core/utils'
import { isLoggedIn, logIn } from '../core/interface'

const personas = {
  nickname: ['panhandler', 'טקסט כלוא', 'chickens came home', 'knot', 'neverhasbeen', 'thats a no'],
  freetext: [
    'tie a knot around thy floor',
    'scatter your feet all over my dreams',
    'tread like your neighbours are the floor',
  ],
  age: ['31'],
  area: ['7'],
  sex: ['1'],
}

const init = async () => {
  Object.keys(personas).forEach(async field => {
    await updateAuNausum(`#${field}`, random(personas[field]))
  })

  if (!(await isLoggedIn())) {
    log('autofill-nick', 'seems we have not logged in yet, let us remedy that...')
    await logIn()
    log('autofill-nick', 'There we are...')
  }
}

feature().add({
  selector: '#ol-anonym',
  init,
})
