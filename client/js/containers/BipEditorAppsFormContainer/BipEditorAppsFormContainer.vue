<style scoped lang="scss" src="./BipEditorAppsFormContainer.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <bp-search-bar></bp-search-bar>
      <div class="apps">
        <bp-app-icon class="app"
                     v-for="app in apps"
                     v-bind:label="app.label"
                     v-bind:icon="`/static/${app.icon}`"
        ></bp-app-icon>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      apps: { type: Array, default: [] }
    }
  }
</script>
