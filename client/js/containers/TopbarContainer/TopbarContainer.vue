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
        ></MenuItem>
        <MenuItem label="Bips"
        ></MenuItem>
        <MenuItem label="Accounts"
        ></MenuItem>
        <MenuItem label="System"
        ></MenuItem>
      </div>
      <div class="column-right">
        
        <button>Make a Bip!</button>
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
