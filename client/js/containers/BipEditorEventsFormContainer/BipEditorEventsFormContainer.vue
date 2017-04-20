<style scoped lang="scss" src=""></style>

<template>
  <div class="container">
    <div class="row">
      <div class="event">
        <bp-radio label="something" v-model="chosenEvent"></bp-radio>
        <bp-radio label="something2" v-model="chosenEvent"></bp-radio>
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
        console.log('chosen event changed ', this.chosenEvent)
      }
    }
  }
</script>
