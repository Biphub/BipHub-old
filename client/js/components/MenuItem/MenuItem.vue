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
      <div v-else v-bind:class="labelWrapperStyle">
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
    name: 'BpMenuItem',
    props: {
      iconType: { type: String, default: null },
      label: { type: String, default: null },
      flexDirection: { type: String, default: 'column' },
      link: { type: String, default: '/' },
      active: { type: Boolean, default: false },
      fontSize: { type: String, default: '15' },
      padding: { type: Boolean, default: true }
    },
    components: {
      Icon
    },
    computed: {
      /**
       * Decides flex direction
       * TODO: Move strings used in this function in constants
       * @returns {string}
       */
      direction () {
        // base padding is enabled by default
        let baseStyle = 'component'
        if (this.padding) {
          baseStyle = 'component component-pad'
        }
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
      labelWrapperStyle () {
        if (this.active) {
          return 'label--active'
        } else {
          return 'label--inactive'
        }
      }
    }

  }
</script>
