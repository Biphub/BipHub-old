<style scoped lang="scss" src="./Option.scss"></style>

<template>
  <div>
    {{ label }}
  </div>
</template>

<script>
  export default {
    props: {
      label: { type: String, default: '' }
    }
  }
</script>
