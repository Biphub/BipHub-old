<style scoped lang="scss" src="./BipEditorFormContainer.scss"></style>
<template>
  <div class="container">
    <div class="row" v-if="this.formType === 'incomingAction'">
      <BipEditorAppForm v-if="stage === 0"></BipEditorAppForm>
      <BipEditorActionForm v-if="stage === 1"></BipEditorActionForm>
    </div>
    <div class="row" v-else-if="this.formType === 'outgoingAction'">
      outgoing action form
    </div>
  </div>
</template>

<script>
  import BipEditorAppForm from '../../components/BipEditorAppForm'
  import BipEditorActionForm from '../../components/BipEditorActionForm'
  import BipEditorOptionsForm from '../../components/BipEditorOptionsForm'
  export default {
    name: 'BipEditorFormContainer',
    props: {
      // Form type can be either incomingAction or outgoingAction
      formType: { type: String, default: 'incomingAction' },
      stage: { type: Number, default: 0 }
    },
    components: {
      BipEditorAppForm,
      BipEditorActionForm,
      BipEditorOptionsForm
    }
  }
</script>
