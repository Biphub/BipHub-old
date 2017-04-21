<style scoped lang="scss" src="./Steps.scss"></style>
<template>
  <div class="container">
    <div class="row"
         v-for="step in steps">
      <div class="column-left">
        <img src="/static/bipflow-logo-standalone.png">
      </div>
      <div class="column-right">
        <ul>
        
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * tasks :
   * [ { label: "choose an app", active: true } ]
   */
  export default {
    name: 'BpSteps',
    props: {
      steps: { type: Array, default: [] }
    },
    methods: {
      getIconType (active) {
        return active ? 'pencil' : 'lock'
      },
      findStepType () {

      }
    }
  }
</script>
