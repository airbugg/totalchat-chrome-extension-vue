import { feature } from '../core/feature'
import { random, updateAuNausum } from '../core/utils'
import { isLoggedIn, logIn } from '../core/interface'

const personas = {
  nickname: [
    'panhandler',
    'אהמ',
    'chickens came home',
    'muttersprache',
    'neverhasbeen',
    'thats a no',
    'much',
  ],
  freetext: [
    'tie a knot around thy floor',
    'scatter your feet all over my dreams',
    'tread like your neighbours are the floor',
    'טקסט כלוא',
  ],
  age: ['30'],
  area: ['1', '3', '7'],
  sex: ['1'],
}

const init = async () => {
  Object.keys(personas).forEach(async field => {
    await updateAuNausum(`#${field}`, random(personas[field]))
  })

  if (!(await isLoggedIn())) {
    await logIn()
  }
}

feature().add({
  selector: '#ol-anonym',
  init,
})
