<style scoped lang="scss" src="./BipEditorSidebarContainer.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <div>
        <label>Name your bip</label>
        <input type="text" />
      </div>
      <div class="progress">
        <BipSteps v-bind:steps="steps"></BipSteps>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 1. It should accept current step
   * 2. It should accept additional steps
   * 3. It should emit compiled json data to page component
   */
  import BipSteps from '../../components/BipSteps'
  export default {
    props: {
      tasks: { type: Array, default: [] }
    },
    data () {
      return {
        steps: [
          {
            tasks: []
          }
        ]
      }
    },
    components: {
      BipSteps
    }
  }
</script>
