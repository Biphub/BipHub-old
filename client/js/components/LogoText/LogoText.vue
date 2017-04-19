<style scoped lang="scss" src="./LogoText.scss"></style>

<template>
  <div class="component">
    <span class="logo-text">
      {{ text }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'BpLogoText',
    props: {
      text: { type: String, default: 'N/A' }
    }
  }
</script>
