<template>
  <button v-on:click="onClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'BpButton',
    props: {
      link: { type: String, default: null }
    },
    methods: {
      onClick () {
        if (this.link) {
          this.$router.push(this.link)
        }
        this.$emit('click')
      }
    }
  }
</script>
