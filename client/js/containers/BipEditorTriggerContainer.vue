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
    justify-content: center;
    padding: 20px;
  }
  .controls {
    width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .dialog {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 20px;
  }
</style>

<template>
  <div class="container">
    Select your trigger
    <div class="apps">
      <bp-app-icon v-on:click="this.onClickTrigger"
      ></bp-app-icon>
    </div>
    <div class="controls">
      <bp-button v-on:click="onClickNext"
      >Next</bp-button>
    </div>
    <bp-dialog v-bind:open='this.openDialog'>
      <div class="dialog">
        <bp-search-bar></bp-search-bar>
        yoyo!!
      </div>
    </bp-dialog>
  </div>
</template>

<script>
  import BpAppIcon from '../components/AppIcon/AppIcon.vue'
  import BpButton from '../components/Button/Button.vue'
  import BpDialog from '../components/Dialog/Dialog.vue'
  import BpSearchBar from '../components/SearchBar/SearchBar.vue'

  export default {
    components: {
      BpSearchBar,
      BpButton,
      BpAppIcon,
      BpDialog
    },
    props: {
      triggerApps: Array
    },
    data () {
      return {
        openDialog: false
      }
    },
    methods: {
      onClickTrigger (values) {
        console.log('testing on clickj!! ', values)
        this.openDialog = true;
      },
      onClickNext () {
        console.log('clicked next!!')
      }
    }
  }
</script>
