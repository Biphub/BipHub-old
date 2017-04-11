<style scoped lang="scss" src="./App.scss"></style>

<template>
  <div class="container"
       v-on:click="onClick" >
    <div class="row">
      <div class="icon" v-bind:style="appTheme">
        <span class="icon-wrapper">
          <img v-bind:src="src">
        </span>
      </div>
      <div class="label"
           v-if="label" >
        <h5>{{ label }}</h5>
        <span>Lorem ipsum</span>
      </div>
      <div class="description"></div>
    </div>
  </div>
</template>

<script>
// gradient images https://uigradients.com
export default {
  props: {
    src: { type: String, default: 'N/A' },
    label: { type: String, default: null },
    border: { type: Boolean, default: false },
    theme: { type: String, default: 'orca' },
  },
  data() {
    
    return {}
  },
  computed: {
    iconBorder () {
      if (this.border) {
        return 'app-icon--border'
      } else {
        return 'app-icon--no-border'
      }
    },
    appTheme() {
      return `background-image: url(static/app_themes/${this.theme}.jpg)`
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
