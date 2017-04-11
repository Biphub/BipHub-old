<style scoped lang="scss" src="./MenuItem.scss"></style>

<template>
  <div class="component">
    <router-link v-bind:to="link">
      <div v-if="iconType" v-bind:class="direction">
        <Icon class="icon"
              v-bind:type="iconType"
        ></Icon>
        <div class="label"
             v-bind:style="labelStyle"
        >{{ label }}</div>
      </div>
      <div v-else>
        <div class="label"
             v-bind:style="labelStyle"
        >{{ label }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import Icon from '../Icon'

  export default {
    props: {
      iconType: { type: String, default: null },
      label: { type: String, default: null },
      flexDirection: { type: String, default: 'column' },
      link: { type: String, default: '/' },
      active: { type: Boolean, default: false },
      fontSize: { type: Number, default: 15 },
    },
    components: {
      Icon
    },
    name: 'MenuItem',
    computed: {
      /**
       * Decides flex direction
       * TODO: Move strings used in this function in constants
       * @returns {string}
       */
      direction () {
        let baseStyle = 'component-pad'
        switch (this.flexDirection) {
          case 'column-reverse':
            return `${baseStyle} component--column-reverse`
          case 'row':
            return `${baseStyle} component--row`
          case 'row-reverse':
            return `${baseStyle} component--row-reverse`
          default:
            return `${baseStyle} component--column`
        }
      },
      labelStyle () {
        return `font-size: ${this.fontSize}px`
      },
    }
  }
</script>
