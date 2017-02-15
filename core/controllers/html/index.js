import { Router } from 'express'

export default () => {
  const html = Router()

  // root HTML
  html.get('/', (req, res) => {
    res.render('html/home.hbs', {
      title: 'Home',
    })
  })
  return html
}
