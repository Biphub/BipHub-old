<style scoped lang="scss" src="./Radio.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <input type="radio" v-bind:id="id" name="selector">
      <label v-bind:for="id">{{ label }}</label>
      <div class="check"><div class="inside"></div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BpRadio',
    props: {
      label: { type: String, default: 'radio' }
    },
    computed: {
      id () {
        return this._uid
      }
    }
  }
</script>
