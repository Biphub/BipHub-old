<style scoped lang="scss" src="./BipStep.scss"></style>
<template>
  <div class="container">
    <div class="row">
      <div class="column-left">
        App logo
      </div>
      <div class="column-right">
        <ul v-if="type === 'incomingAction'">
          <li>Choose an app</li>
          <li>Choose an event</li>
          <li>Set options</li>
          <li>Set conditions</li>
          <li>Test it</li>
        </ul>
        <ul v-else-if="type === 'additionalStep'">
          <li>Choose an app</li>
          <li>Choose an event</li>
          <li>Set options</li>
          <li>Set conditions</li>
          <li>Test it</li>
        </ul>
        <ul v-else-if="type === 'outgoingAction'">
          <li>Choose an app</li>
          <li>Choose an event</li>
          <li>Set options</li>
          <li>Test it</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * Apps: user must choose an app which represents an agent
   */
  export default {
    props: {
      step: { type: String, default: 'chooseAnApp' },
      type: { type: String, default: 'incomingAction' }
    }
  }
</script>
