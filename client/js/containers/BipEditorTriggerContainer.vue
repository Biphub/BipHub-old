<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  .row {
    width: 100%;
  }
  .apps {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
  }
  .controls {
    width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
</style>

<template>
  <div class="container">
    <div class="apps">
      <bp-app-icon v-on:click="this.onClick"
      ></bp-app-icon>
      <bp-app-icon v-on:click="this.onClick"
      ></bp-app-icon>
    </div>
    <div class="controls">
      <bp-button>Next</bp-button>
    </div>
  </div>
</template>

<script>
  import BpAppIcon from '../components/AppIcon/AppIcon.vue'
  import BpButton from '../components/Button/Button.vue'

  export default {
    components: {
      BpButton,
      BpAppIcon
    },
    props: {
      triggerApps: Array
    },
    methods: {
      onClick (values) {
        console.log('testing on clickj!! ', values)
      }
    }
  }
</script>
