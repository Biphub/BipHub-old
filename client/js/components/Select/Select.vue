<style scoped lang="scss" src="./Select.scss"></style>

<template>
  <div>
    <div class="label">{{ label }}</div>
    <div class="output">
    
    </div>
    <div class="options">
    
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BpSelect',
    props: {
      label: { type: String, default: '' },
      options: { type: Array, default: [] }
    }
  }
</script>
