import { Router } from 'express'

export default ({config, db}) => {
  const html = Router()

  // root HTML
  html.get('/', (req, res) => {
    res.render('html/home', {
      title: 'Home'
    })
  })

  return html
}
