<style scoped lang="scss" src="./HomePage.scss"></style>

<template>
  <BasePage>
    <div class="base-main-width">
      <div>
        <home-apps-panel-container v-on:onAppClick="onAppClick"
        ></home-apps-panel-container>
      </div>
    </div>
    <form>
      testing yoyo hotrealod
      <bp-radio label="test1" v-model="stuff"></bp-radio>
      <bp-radio label="test2" v-model="stuff"></bp-radio>
      <bp-radio label="test3" v-model="stuff"></bp-radio>
      <bp-select v-bind:options="['test', 'test2']"></bp-select>
    </form>
    
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
  import BasePage from '../Base';
  import HomeAppsPanelContainer from '../../containers/HomeAppsPanelContainer';
  import SuggestionContainer from '../../containers/SuggestionContainer';

  export default {
    components: {
      BasePage,
      SuggestionContainer,
      HomeAppsPanelContainer
    },
    props: {
      test: { type: String, default: 'nothing!' }
    },
    data () {
      return {
        stuff: ''
      };
    },
    mounted () {
      this.$store.dispatch('home_initial_load');
    },
    methods: {
      onAppClick () {
      // this.$router.
      }
    }
  };
</script>
