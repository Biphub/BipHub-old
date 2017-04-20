<style scoped lang="scss" src="./Radio.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <input type="radio"
             name="selector"
             v-model="model"
             v-bind:id="radioId"
             v-bind:value="label">
      <label v-bind:for="radioId">{{ label }}</label>
      <div class="check"><div class="inside"></div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BpRadio',
    props: {
      label: { type: String, default: 'radio' },
      value: { type: String, default: '' }
    },
    computed: {
      radioId () {
        return this._uid
      },
      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
