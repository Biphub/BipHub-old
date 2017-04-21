<style scoped lang="scss" src="./BipEditorIncomingActionFormContainer.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <div class="events">
        <div class="event">
          <bp-radio label="something" v-model="chosenEvent"></bp-radio>
          <div class="description">
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </div>
        </div>
        <div class="event">
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
      events: { type: Array, default: [] }
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
