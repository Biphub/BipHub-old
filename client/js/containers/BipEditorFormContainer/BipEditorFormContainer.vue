<style scoped lang="scss" src="./BipEditorFormContainer.scss"></style>
<template>
  <div>
    test bip editor form container
  </div>
</template>

<script>
  export default {
    props: {
      // Form type can be either incomingAction or outgoingAction
      formType: { type: String, default: 'incomingAction' }
    }
  }
</script>
