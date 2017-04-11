<style scoped lang="scss" src="./BipSidebarContainer.scss"></style>

<template>
  <div class="container">
    <BipStep type="incomingAction"></BipStep>
    <BipStep type="incomingAction"></BipStep>
  </div>
</template>

<script>
  import BipStep from '../../components/BipStep'
  export default {
    components: {
      BipStep
    }
  }
</script>
