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
  UserProfile
]

const install = (Vue, options = {}) => {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
