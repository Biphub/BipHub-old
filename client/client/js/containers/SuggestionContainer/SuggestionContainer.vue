<style scoped lang="scss" src="./SuggestionContainer.scss"></style>

<template>
  <div class="container">
    <div is="Card"
         class="suggestion-card"
         header="test"
    ></div>
    <div is="Card"
         class="suggestion-card"
         header="test"
    ></div>
    <div is="Card"
         class="suggestion-card"
         header="test"
    ></div>
  </div>
</template>

<script>
  import Card from 'components/Card'

  export default {
    components: {
      Card,
    }
  }
</script>
