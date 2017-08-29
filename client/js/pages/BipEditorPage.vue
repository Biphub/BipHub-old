<style scoped lang="scss">
  @import "../../styles/padding";
  .container {
    background-color: #f1f4f5;
  }
  
  .row {
    display: flex;
    flex-direction: row;
  }
  
  .column-left {
    min-width: 400px;
    @extend %pd-4x;
  }
  
  .column-right {
    width: 90%;
    display: flex;
    justify-content: center;
    box-shadow: 1px 2px 5px 0 rgba(0,0,0,0.21);
    background-color: white;
    border-radius: 5px;
    margin: 20px;
    padding: 20px;
  }
</style>

<template>
  <BasePage type="control">
    <div class="container">
      <div class="row">
        <bip-editor-sidebar-container></bip-editor-sidebar-container>
        <bip-editor-trigger-container></bip-editor-trigger-container>
      </div>
    </div>
  </BasePage>
</template>

<script>
  /**
   * Select an app
   * Select a trigger
   * Select an action
   * Select more actions
   */
  import BasePage from './Base.vue'
  import TopBarContainer from '../containers/TopbarContainer/index'
  import BipEditorSidebarContainer from '../containers/BipEditorSidebarContainer/index'
  import BipEditorTriggerContainer from '../containers/BipEditorTriggerContainer/index'
  export default {
    components: {
      BasePage,
      TopBarContainer,
      BipEditorSidebarContainer,
      BipEditorTriggerContainer,
    },
    data () {
      return {
        bip: {
          name: '', // Name is used to define bip name
          incomingAction: {
            customName: 'event',  // name of this step
            payload: {
              app: 0,  // app id
              event: 0,  // incoming action id
              conditions: [], // array of conditions [ [1, 'stuff'] ] // condition id and value
              options: [] // array of options [ [1, 'something'] ] // options id and value
            }
          },
          outgoingActions: {
            customName: 'action',
            payload: [
              {
                app: '',
                action: '',
                conditions: '',
                options: []
              },
              {
                app: '',
                action: '',
                conditions: '',
                options: []
              }
            ]
          }
        }
      }
    },
    mounted () {
      this.$store.dispatch('bip_editor_inital_load')
    },
    methods: {
    }
  }
</script>
