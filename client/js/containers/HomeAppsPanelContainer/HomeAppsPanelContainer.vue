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
    <div v-for="app in apps">
      {{ app.icon }}
    </div>
    <div class="component-pad api-list">
      <bp-app-card label="Discord"
           src="static/icon-discord.png"
           v-bind:border="true"
           theme="orca"
           v-on:click="onAppClick"
      ></bp-app-card>
      <bp-app-card label="Dota 2"
           v-bind:border="true"
           theme="grey"
           src="static/icon-dota2.png"
      ></bp-app-card>
      <bp-app-card label="Gmail"
           src="static/icon-gmail.png"
           theme="ice"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="Hearthstone"
           src="static/icon-hearthstone.png"
           theme="love"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="Minecraft"
           src="static/icon-minecraft.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="Overwatch"
           src="static/icon-overwatch.png"
           theme="tonight"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="Team Fortress2"
           src="static/icon-tf2.png"
           theme="rose"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           theme="wave"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="Team Fortress2"
           src="static/icon-tf2.png"
           theme="love"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="Team Fortress2"
           src="static/icon-tf2.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="Team Fortress2"
           src="static/icon-tf2.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>
      <bp-app-card label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></bp-app-card>

    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      apps () {
        console.log('apps ', this.$store.state.AppModule.apps)
        return this.$store.state.AppModule.apps
      }
    },
    methods: {
      onAppClick () {
        this.$emit('onAppClick')
      }
    }
  }
</script>
