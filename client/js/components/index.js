import Button from './Button'

const components = [
  Button
]

const install = (Vue, options = {}) => {
  components.map(component => {
    console.log('installing component ', component.name)
    Vue.component(component.name, component)
  })
}

export default {
  install
}
