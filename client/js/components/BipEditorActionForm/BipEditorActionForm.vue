<style scoped lang="scss" src="./BipEditorActionForm.scss"></style>
<template>
  <div class="container">
    <div class="form-label">{{ formLabel }}</div>
    <div v-for="action in actions">
    
    </div>
  </div>
</template>

<script>
  /**
   * This component can be either incomingActionForm or outgoingActionForm
   */
  export default {
    props: {
      // form type can be either incomingAction or outgoingAction
      formType: { type: String, default: 'incomingAction' },
      actions: { type: Array, default: [] }
    },
    computed: {
      formLabel () {
        return 'form label'
      }
    }
  }
</script>
