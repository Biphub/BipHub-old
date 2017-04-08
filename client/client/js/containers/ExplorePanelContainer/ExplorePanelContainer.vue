<style scoped lang="scss" src="./ExplorePanelContainer.scss"></style>

<template>
  <div class="explore-panel">

    <div class="component-pad">
      <div class="explore-heading">
        <Icon type="search"></Icon> Pick Apps to find out automating them
      </div>
    </div>

    <div class="component-pad">
      <SearchBar></SearchBar>
    </div>

    <div class="component-pad api-list">
      <App label="Discord"
           src="static/icon-discord.png"
           v-bind:border="true"
           v-on:click="onAppClick"
      ></App>
      <App label="Dota 2"
           v-bind:border="true"
           src="static/icon-dota2.png"
      ></App>
      <App label="Gmail"
           src="static/icon-gmail.png"
           v-bind:border="true"
      ></App>
      <App label="Hearthstone"
           src="static/icon-hearthstone.png"
           v-bind:border="true"
      ></App>
      <App label="Minecraft"
           src="static/icon-minecraft.png"
           v-bind:border="true"
      ></App>
      <App label="Overwatch"
           src="static/icon-overwatch.png"
           v-bind:border="true"
      ></App>
      <App label="Team Fortress2"
           src="static/icon-tf2.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="Team Fortress2"
           src="static/icon-tf2.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="Team Fortress2"
           src="static/icon-tf2.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="Team Fortress2"
           src="static/icon-tf2.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>
      <App label="WoW"
           src="static/icon-wow.png"
           v-bind:border="true"
      ></App>

    </div>
  </div>
</template>

<script>
  import App from 'components/App'
  import Icon from 'components/Icon'
  import SearchBar from 'components/SearchBar'

  export default {
    components: {
    	Icon,
      SearchBar,
      App,
    },
    methods: {
      onAppClick() {
      	this.$emit('onAppClick')
      }
    }
  }
</script>
