<style scoped lang="scss" src="./HomePage.scss"></style>

<template>
  <BasePage>
    <div class="base-main-width">
      <div>
        <HomeAppsPanelContainer v-on:onAppClick="onAppClick"
                               v-bind:apps="apps"
        ></HomeAppsPanelContainer>
      </div>
    </div>
    <form>
    <bp-radio></bp-radio>
    <bp-radio></bp-radio>
    <bp-radio></bp-radio>
    </form>
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
  import HomeAppsPanelContainer from '../../containers/HomeAppsPanelContainer'
  import SuggestionContainer from '../../containers/SuggestionContainer'
  import InfoBox from '../../components/InfoBox'

  export default {

    components: {
      BasePage,
      InfoBox,
      SuggestionContainer,
      HomeAppsPanelContainer
    },
    props: {
      test: { type: String, default: 'nothing!' }
    },
    mounted () {
      this.$store.dispatch('loadApps')
    },
    methods: {
      onAppClick () {
      // this.$router.
      }
    }
  }
</script>
