<style scoped lang="scss" src="./BipEditorFormContainer.scss"></style>
<template>
  <div class="container">
    <div class="row" v-if="this.formType === 'incomingAction'">
      <apps-form-container v-if="stage === 0"
                           v-bind:apps="apps"
      ></apps-form-container>
      <incoming-action-form-container v-else-if="stage === 1"
      ></incoming-action-form-container>
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
      formType: { type: String, default: 'incomingAction' },
      stage: { type: Number, default: 0 }
    },
    components: {
      AppsFormContainer,
      IncomingActionFormContainer
    },
    computed: {
      apps () {
        return this.$store.state.BipEditorModule.apps
      }
    }
  }
</script>
