<style scoped lang="scss" src="./TopbarContainer.scss"></style>

<template>
  <div v-bind:class="topbarClass">
    <div v-if="type === 'dashboard'" class="row">
      <div class="column-left">
        <div class="logo">
          <img class="logo" src="/static/bipflow-logo.png">
        </div>
      </div>
      <div class="column-center">
        <MenuItem label="Apps"
                  fontSize="18"
                  v-bind:active="getMenuActive('/')"
        ></MenuItem>
        <MenuItem label="Bips"
                  fontSize="18"
                  v-bind:active="getMenuActive('bips')"
        ></MenuItem>
        <MenuItem label="Accounts"
                  fontSize="18"
                  v-bind:active="getMenuActive('accounts')"
        ></MenuItem>
        <MenuItem label="System"
                  fontSize="18"
                  v-bind:active="getMenuActive('system')"
        ></MenuItem>
      </div>
      <div class="column-right">
        <Button link="/bips">Make a Bip!</Button>
        <div>
          <UserProfile v-bind:enableName="true"
                       v-bind:enableWelcome="true"
                       name="Jason"
          ></UserProfile>
        </div>
      </div>
    </div>
    
    <div v-if="type === 'control'" class="row row-control">
      <div class="column-left">
        <MenuItem iconType="arrow-left"
                  label="dashboard"
                  flexDirection="row"
                  link="/"
        ></MenuItem>
      </div>
      <div class="column-center">
        <div class="logo">
          <img class="logo" src="/static/bipflow-logo.png">
        </div>
      </div>
      <div class="column-right">saving..</div>
    </div>
  </div>
</template>

<script>
import Button from '../../components/Button'
import UserProfile from '../../components/UserProfile'
import MenuItem from '../../components/MenuItem'

export default {
  props: {
    type: { type: String, default: 'dashboard' }
  },
  components: {
    Button,
    MenuItem,
    UserProfile
  },
  methods: {
    getMenuActive (label) {
      return window.location.pathname.indexOf(label) !== -1
    }
  },
  computed: {
    topbarClass () {
      if (this.type === 'dashboard') {
        return 'container container-dashboard'
      } else {
        return 'container container-control'
      }
    }
  },
}
</script>
