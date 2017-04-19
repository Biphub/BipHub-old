<style scoped lang="scss" src="./BipEditorForm.scss"></style>

<template>
  <div>
    bip editor form
    <div v-if="formType === 'incomingAction'">
    
    </div>
    <div v-if="formType === 'outgoingAction'">
    
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      formType: { type: String, default: 'incomingAction' }
    }
  }
</script>
