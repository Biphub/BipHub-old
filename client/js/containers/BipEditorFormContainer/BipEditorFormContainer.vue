<style scoped lang="scss" src="./BipEditorFormContainer.scss"></style>
<template>
  <div class="container">
    <div class="row" v-if="this.formType === 'incomingAction'">
      incoming action container
      <apps-form-container></apps-form-container>
      <incoming-action-form-container></incoming-action-form-container>
    </div>
    <div class="row" v-else-if="this.formType === 'outgoingAction'">
      outgoing action form
    </div>
  </div>
</template>

<script>
  import AppsFormContainer from '../BipEditorAppsFormContainer'
  import IncomingActionFormContainer from '../BipEditorIncomingActionFormContainer'
  export default {
    name: 'BipEditorFormContainer',
    props: {
      // Form type can be either incomingAction or outgoingAction
      formType: { type: String, default: 'incomingAction' },
      stage: { type: Number, default: 0 }
    },
    components: {
      AppsFormContainer,
      IncomingActionFormContainer
    }
  }
</script>
