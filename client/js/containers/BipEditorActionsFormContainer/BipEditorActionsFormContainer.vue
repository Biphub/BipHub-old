<style scoped lang="scss" src="./BipEditorActionsFormContainer.scss"></style>

<template>
  <div class="container">
    <div class="row">
      {{ label }}
      <bp-search-bar></bp-search-bar>
      <div class="actions">
        <div class="action">
          <bp-radio label="something" v-model="chosenEvent"></bp-radio>
          <div class="description">
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </div>
        </div>
        <div class="action">
          <bp-radio label="something2" v-model="chosenEvent"></bp-radio>
          <div class="description">
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      actions: { type: Array, default: [] },
      // Type can be either incoming or outgoing
      type: { type: String, default: 'incoming' },
      label: { type: String, default: '' }
    },
    data () {
      return {
        chosenEvent: {}
      }
    },
    watch: {
      chosenEvent () {
      }
    }
  }
</script>
