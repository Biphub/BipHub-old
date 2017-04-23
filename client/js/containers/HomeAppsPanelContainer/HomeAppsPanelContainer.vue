<style scoped lang="scss" src="./HomeAppsPanelContainer.scss"></style>

<template>
  <div class="explore-panel">

    <div class="component-pad">
      <div class="explore-heading">
        <bp-icon type="search"></bp-icon> Pick Apps to find out automating them
      </div>
    </div>

    <div class="component-pad">
      <bp-search-bar></bp-search-bar>
    </div>
    <div class="component-pad api-list">
      <bp-app-card v-for="app in apps"
                   class="component"
                   v-bind:label="app.label"
                   v-bind:src="`static/${app.icon}`"
                   v-bind:border="true"
                   v-bind:description="app.description"
                   v-on:click="onAppClick"
                   theme="orca"
      ></bp-app-card>
      <bp-app-card class="component"
                   icon="plus"
                   label="Add new app"
      ></bp-app-card>
      <div>
      
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      apps () {
        return this.$store.state.HomeModule.apps
      }
    },
    methods: {
      onAppClick () {
        this.$emit('onAppClick')
      }
    }
  }
</script>
