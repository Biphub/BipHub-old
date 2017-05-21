<style scoped lang="scss" src="./Card.scss"></style>

<template>
  <div class="card component">

    <div class="component-pad">
      <div class="header">{{ header }}</div>
      <div class="formula-box">
        <AppCard src="static/icon-hearthstone.png"></AppCard>
        <Icon class="plus" type="plus"></Icon>
        <AppCard src="static/icon-hearthstone.png"></AppCard>
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
  import AppCard from '../AppCard'
  import Icon from '../Icon'

  export default {
    name: 'BpCard',
    props: {
      header: { type: String, default: null }
    },
    components: {
      AppCard,
      Icon
    }
  }
</script>
