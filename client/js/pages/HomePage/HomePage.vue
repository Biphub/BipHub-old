<style scoped lang="scss" src="./HomePage.scss"></style>

<template>
  <BasePage>
    <div class="base-main-width">
      <div>
        <ExplorePanelContainer v-on:onAppClick="onAppClick"
        ></ExplorePanelContainer>
        <SuggestionContainer></SuggestionContainer>
      </div>
    </div>
  </BasePage>
</template>

<script>
import BasePage from '../Base'
import ExplorePanelContainer from 'containers/ExplorePanelContainer'
import SuggestionContainer from 'containers/SuggestionContainer'
import InfoBox from 'components/InfoBox'

// TODO: Implement page builder
export default {
  components: {
    BasePage,
    InfoBox,
    SuggestionContainer,
    ExplorePanelContainer,
  },
  props: {
    test: { type: String, default: 'nothing!' }
  },
  methods: {
  	onAppClick() {
      //this.$router.
    }
  }
}
</script>
