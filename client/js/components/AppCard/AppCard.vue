<style scoped lang="scss" src="./AppCard.scss"></style>

<template>
  <div class="container"
               to="bip"
               v-on:click="onClick" >
    <div class="row">
      <div class="icon"
           v-bind:style="appTheme"
           v-if="!icon" >
        <span class="icon-wrapper">
          <img v-bind:src="appSrc">
        </span>
      </div>
      <div class="icon icon-font"
           v-else-if="icon" >
        <bp-icon v-bind:type="icon"
                 class="icon-font-item" ></bp-icon>
      </div>
      <div class="label"
           v-if="label && !icon" >
        <h5>{{ label }}</h5>
        <span>{{ description }}</span>
      </div>
      <div class="label icon-label"
           v-if="label && icon" >
        <h5>{{ label }}</h5>
      </div>
      <div class="description"></div>
    </div>
  </div>
</template>

<script>
  // gradient images https://uigradients.com
  export default {
    name: 'BpAppCard',
    props: {
      src: { type: String, default: 'N/A' },
      icon: { type: String, default: null },
      label: { type: String, default: null },
      border: { type: Boolean, default: false },
      description: { type: String, default: '' },
      theme: { type: String, default: 'orca' },
      link: { type: String, default: null }
    },
    data () {
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
      appTheme () {
        return `background-image: url(/static/app_themes/${this.theme}.jpg)`
      },
      appSrc () {
        if (!/^\//.test(this.src)) {
          return `/${this.src}`
        }
        return this.src
      }
    },
    methods: {
      onClick () {
        if (this.link) {
          return this.$router.push(this.link)
        }
        this.$emit('click')
      }
    }
  }
</script>
