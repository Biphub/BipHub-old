<style scoped lang="scss" src="./BipEditorOptionsFormContainer.scss"></style>

<template>
  <div class="options">
  
    <h3>Set options</h3>
    <div class="option">
      <label class="name">Channel name</label>
      <div class="input">
        <input type="text" />
        <span>Lorem ipsum Lorem ipsum Lorem ipsum</span>
      </div>
    </div>
  
    <div class="option">
      <label class="name">Channel name</label>
      <div class="input">
        <input type="text" />
        <span>Lorem ipsum Lorem ipsum Lorem ipsum</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      options: { type: Array, default: [] }
    }
  };
</script>
