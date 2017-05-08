<style scoped lang="scss" src="./AppIcon.scss"></style>
<template>
  <div class="container"
       v-on:click="click">
    <div class="row">
      <div class="icon">
        <img v-bind:src="icon">
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
      icon: { type: String, default: '/static/icon-discord.png' },
      label: { type: String, default: 'Discord' }
    },
    methods: {
      click () {
        this.$emit('click', this.label);
      }
    }
  };
</script>
