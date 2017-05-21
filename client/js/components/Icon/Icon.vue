<style scoped lang="scss" src="./Icon.scss"></style>

<template>
  <span class="icon">
    <i v-bind:class="iconClass" aria-hidden="true"></i>
  </span>
</template>
<script>
  export default {
    name: 'BpIcon',
    props: {
      type: { type: String, default: 'home' }
    },
    computed: {
      iconClass () {
        return `fa fa-${this.type}`
      }
    }
  }
</script>
