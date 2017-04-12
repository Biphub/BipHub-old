<style scoped lang="scss" src="./BipSidebarContainer.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <div>
        <label>Name your bip</label>
        <input type="text" />
      </div>
      <BipStep type="incomingAction"></BipStep>
      <BipStep type="incomingAction"></BipStep>
    </div>
  </div>
</template>

<script>
  /**
   * 1. It should accept current step
   * 2. It should accept additional steps
   * 3. It should emit compiled json data to page component
   */
  import BipStep from '../../components/BipStep'
  export default {
    components: {
      BipStep
    }
  }
</script>
