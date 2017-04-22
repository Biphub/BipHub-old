<style scoped lang="scss" src="./BipEditorFormContainer.scss"></style>
<template>
  <div class="container">
    <div class="row" v-if="this.formType === 'incomingAction'">
      <apps-form-container v-if="stage === 0"
                           v-bind:apps="apps"
      ></apps-form-container>
      <actions-form-container v-else-if="stage === 1"
                             type="incoming"
                             label="event"
      ></actions-form-container>
    </div>
    <div class="row" v-else-if="this.formType === 'outgoingAction'">
      outgoing action form
    </div>
  </div>
</template>

<script>
  import AppsFormContainer from '../BipEditorAppsFormContainer'
  import ActionsFormContainer from '../BipEditorActionsFormContainer'
  export default {
    name: 'BipEditorFormContainer',
    props: {
      formType: { type: String, default: 'incomingAction' },
      stage: { type: Number, default: 1 }
    },
    components: {
      AppsFormContainer,
      ActionsFormContainer
    },
    computed: {
      apps () {
        return this.$store.state.BipEditorModule.apps
      }
    }
  }
</script>
