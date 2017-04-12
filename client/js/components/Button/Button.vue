<template>
  <button v-on:click="onClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
      link: { type: String, default: null }
    },
    methods: {
      onClick() {
        if (this.link) {
          return window.location = this.link
        }
        this.$emit('click')
      }
    }
  }
</script>
