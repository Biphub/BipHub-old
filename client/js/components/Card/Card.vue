<style scoped lang="scss" src="./Card.scss"></style>

<template>
  <div class="card component">

    <div class="component-pad">
      <div class="header">{{ header }}</div>
      <div class="formula-box">
        <App src="static/icon-hearthstone.png"></App>
        <Icon class="plus" type="plus"></Icon>
        <App src="static/icon-hearthstone.png"></App>
      </div>
      <div class="actions">
        <div class="component-pad">
          <div class="action-button">Share</div>
          <div class="action-button">Bip</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import App from 'components/App'
  import Icon from 'components/Icon'

  export default {
    props: {
      header: { type: String, default: null }
    },
    components: {
      App,
      Icon
    }
  }
</script>
