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
        <bp-menu-item label="Apps"
                  fontSize="18"
                  v-bind:active="getMenuActive('/')"
        ></bp-menu-item>
        <bp-menu-item label="Bips"
                  fontSize="18"
                  v-bind:active="getMenuActive('bips')"
        ></bp-menu-item>
        <bp-menu-item label="Accounts"
                  fontSize="18"
                  v-bind:active="getMenuActive('accounts')"
        ></bp-menu-item>
        <bp-menu-item label="System"
                  fontSize="18"
                  v-bind:active="getMenuActive('system')"
        ></bp-menu-item>
      </div>
      <div class="column-right">
        <bp-button link="/bip/editor">Make a Bip!</bp-button>
        <div>
          <bp-user-profile v-bind:enableName="true"
                       v-bind:enableWelcome="true"
                       name="Jason"
          ></bp-user-profile>
        </div>
      </div>
    </div>
    
    <div v-if="type === 'control'" class="row row-control">
      <div class="column-left">
        <bp-menu-item iconType="arrow-left"
                  label="dashboard"
                  flexDirection="row"
                  link="/"
                  v-bind:padding="false"
        ></bp-menu-item>
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

export default {
  props: {
    type: { type: String, default: 'dashboard' }
  },
  methods: {
    getMenuActive (label) {
      return window.location.pathname.indexOf(label) !== -1;
    }
  },
  computed: {
    topbarClass () {
      if (this.type === 'dashboard') {
        return 'container container-dashboard';
      } else {
        return 'container container-control';
      }
    }
  }
};
</script>
