<style scoped lang="scss" src="./App.scss"></style>

<template>
  <div class="container"
       v-on:click="onClick" >
    <div class="row">
      <div class="icon">
        <span class="icon-wrapper">
          <img v-bind:src="src">
        </span>
      </div>
      <div class="label"
           v-if="label" >
        {{ label }}
      </div>
      <div class="description"></div>
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
