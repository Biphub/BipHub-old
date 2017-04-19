<style scoped lang="scss" src="./InfoBox.scss"></style>

<template>
  <div class="component">

    <div class="values">
      <div class="heading info-box-heading">
        {{ value }}
      </div>
      <Icon class="values-icon"
            v-bind:type="iconType"
      ></Icon>
    </div>

    <div class="description info-box-description">
      {{ description }}
    </div>

  </div>
</template>

<script>
  import Icon from '../Icon'
  export default {
    name: 'BpInfoBox',
    components: {
      Icon
    },
    props: {
      value: { type: String, default: 'N/A' },
      iconType: { type: String, default: 'home' },
      description: { type: String, default: 'N/A' }
    }
  }
</script>
