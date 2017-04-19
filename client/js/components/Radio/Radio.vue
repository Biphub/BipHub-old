<style scoped lang="scss" src="./Radio.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <input type="radio" id="s-option" name="selector">
      <label for="s-option">{{ label }}</label>
      <div class="check"><div class="inside"></div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BpRadio',
    props: {
      label: { type: String, default: 'radio' }
    }
  }
</script>
