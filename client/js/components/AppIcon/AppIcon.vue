<style scoped lang="scss" src="./AppIcon.scss"></style>
<template>
  <div class="container"
       v-on:click="click">
    <div class="row">
      <div class="icon">
        <img v-if='icon' v-bind:src="icon">
        <span v-if='!icon' class='empty' />
      </div>
      <div class="label">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BpAppIcon',
    props: {
      icon: { type: String },
      label: { type: String, default: 'Select' }
    },
    methods: {
      click () {
        this.$emit('click', this.label)
      }
    }
  }
</script>
