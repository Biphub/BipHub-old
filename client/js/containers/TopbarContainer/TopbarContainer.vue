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
        <menu-item label="Apps"
                  fontSize="18"
                  v-bind:active="getMenuActive('/')"
        ></menu-item>
        <menu-item label="Bips"
                  fontSize="18"
                  v-bind:active="getMenuActive('bips')"
        ></menu-item>
        <menu-item label="Accounts"
                  fontSize="18"
                  v-bind:active="getMenuActive('accounts')"
        ></menu-item>
        <menu-item label="System"
                  fontSize="18"
                  v-bind:active="getMenuActive('system')"
        ></menu-item>
      </div>
      <div class="column-right">
        <bp-button link="/bip/editor">Make a Bip!</bp-button>
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
        <menu-item iconType="arrow-left"
                  label="dashboard"
                  flexDirection="row"
                  link="/"
                  v-bind:padding="false"
        ></menu-item>
      </div>
      <div class="column-center">
        <div class="logo">
          <img class="logo" src="/static/bipflow-logo-standalone.png">
        </div>
      </div>
      <div class="column-right">saving..</div>
    </div>
  </div>
</template>

<script>
import UserProfile from '../../components/UserProfile'
import MenuItem from '../../components/MenuItem'

export default {
  props: {
    type: { type: String, default: 'dashboard' }
  },
  components: {
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
  }
}
</script>
