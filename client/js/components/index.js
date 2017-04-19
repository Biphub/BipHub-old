import App from './App'
import Button from './Button'
import Card from './Card'
import Icon from './Icon'
import InfoBox from './InfoBox'
import LogoText from './LogoText'
import MenuItem from './MenuItem'
import SearchBar from './SearchBar'
import Steps from './Steps'
import UserProfile from './UserProfile'
import Radio from './Radio'

const components = [
  Button,
  App,
  Card,
  Icon,
  InfoBox,
  LogoText,
  MenuItem,
  SearchBar,
  Steps,
  UserProfile,
  Radio
]

/**
 * Install method is exposed to Vue
 * @param Vue
 * @param options
 */
const install = (Vue, options = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
