<style scoped lang="scss" src="./BipSidebarContainer.scss"></style>

<template>
  <div class="container">
    <div>
      <label>Name your bip</label>
      <input type="text" />
    </div>
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
