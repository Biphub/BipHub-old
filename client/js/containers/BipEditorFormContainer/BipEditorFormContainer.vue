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
      <options-form-container v-else-if="stage === 2"
      ></options-form-container>
    </div>
    <div class="row" v-else-if="this.formType === 'outgoingAction'">
      outgoing action form
    </div>
  </div>
</template>

<script>
  import AppsFormContainer from '../BipEditorAppsFormContainer';
  import ActionsFormContainer from '../BipEditorActionsFormContainer';
  import OptionsFormContainer from '../BipEditorOptionsFormContainer';
  export default {
    name: 'BipEditorFormContainer',
    props: {
      formType: { type: String, default: 'incomingAction' },
      stage: { type: Number, default: 2 }
    },
    components: {
      AppsFormContainer,
      ActionsFormContainer,
      OptionsFormContainer
    },
    computed: {
      apps () {
        return this.$store.state.BipEditorModule.apps;
      }
    }
  };
</script>
