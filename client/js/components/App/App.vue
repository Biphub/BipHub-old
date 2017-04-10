<style scoped lang="scss" src="./App.scss"></style>

<template>
  <div class="component"
       v-on:click="onClick" >
    <div v-bind:class="iconBorder">
      <img v-bind:src="src">
    </div>
    <div class="app-label"
         v-if="label" >
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: 'N/A' },
    label: { type: String, default: null },
    border: { type: Boolean, default: false }
  },
  computed: {
    iconBorder () {
      console.log('border ', this.border)
      if (this.border) {
        return 'app-icon--border'
      } else {
        return 'app-icon--no-border'
      }
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
