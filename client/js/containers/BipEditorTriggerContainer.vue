<style lang="scss" module>
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
  .dialogApps {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    justify-content: space-around;
  }
  .app {
  }
</style>

<template>
  <div v-bind:class="$style.container">
    Select your trigger
    <div v-bind:class="$style.apps">
      <bp-app-icon v-on:click="this.onClickTrigger"
      ></bp-app-icon>
    </div>
    <div v-bind:class="$style.controls">
      <bp-button v-on:click="onClickNext"
      >Next</bp-button>
    </div>
    <bp-dialog v-bind:open='this.openDialog'
               v-on:onClose='this.onCloseDialog'
    >
      <div v-bind:class="$style.dialog">
        <bp-search-bar></bp-search-bar>
        <div v-bind:class="$style.dialogApps">
          <bp-app-card v-for="app in apps"
                       v-bind:key="app.id"
                       v-bind:label="app.label"
                       v-bind:src="`static/${app.icon}`"
                       v-bind:border="true"
                       v-bind:description="app.description"
                       v-on:click="onClickApp"
                       theme="orca"
          ></bp-app-card>
        </div>
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
    data () {
      return {
        openDialog: false
      }
    },
    computed: {
      apps () {
        return this.$store.state.HomeModule.apps
      }
    },
    methods: {
      /**
       * Opens up the dialog
       * @param values
       */
      onClickTrigger (values) {
        console.log('testing on clickj!! ', values)
        this.openDialog = true
      },
      onClickApp (value) {
        console.log('app clicked! ', value)
        this.openDialog = false
      },
      onCloseDialog () {
        this.openDialog = false
      },
      onClickNext () {
        console.log('clicked next!!')
      }
    }
  }
</script>
