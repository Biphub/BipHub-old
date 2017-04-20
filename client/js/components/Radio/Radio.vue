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
  /**
   * Radio component will update model variable
   */
  export default {
    name: 'BpRadio',
    props: {
      label: { type: String, default: 'radio' }
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
