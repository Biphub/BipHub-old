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
    <h1>Bipflow</h1>
    <h2>Bipflow</h2>
    <h3>Bipflow</h3>
    <h4>Bipflow</h4>
    <h5>Bipflow</h5>
    <h6>Bipflow</h6>
    <div>
      <button class="btn" type="button">Button button</button>
      <a class="btn" href="#" role="button">Link button</a>
    </div>
    <div>
      <button class="btn" type="button">Button</button>
      <button class="btn btn-sm" type="button">Small button</button>
    </div>
    <div>
      <button class="btn btn-primary" type="button">Primary button</button>
      <button class="btn btn-sm btn-primary" type="button">Small primary button</button>
    </div>
    <div>
      <button class="btn btn-danger" type="button">Danger button</button>
      <button class="btn btn-sm btn-danger" type="button">Small danger button</button>
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
