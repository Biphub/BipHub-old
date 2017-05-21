<style scoped lang="scss" src="./BipEditorPage.scss"></style>

<template>
  <BasePage type="control">
    <div class="container">
      <div class="row">
        
        <BipEditorSidebarContainer class="column-left"
        ></BipEditorSidebarContainer>
        
        <BipEditorFormContainer class="column-right"
        ></BipEditorFormContainer>
        
      </div>
    </div>
  </BasePage>
</template>

<script>
  /**
   * Ideas:
   * 1. app logo with circle border that fills in as user finishes bip creation
   * 2. bip steps (being able to add extra steps)
   * 3. add step name
   * 4. set event ( app, incoming action, options, conditions, test )
   * 5. set actions multiple ( app, outgoing action, options, test )
   */
  import BasePage from '../Base'
  import TopBarContainer from '../../containers/TopbarContainer'
  import BipEditorSidebarContainer from '../../containers/BipEditorSidebarContainer'
  import BipEditorFormContainer from '../../containers/BipEditorFormContainer'
  export default {
    components: {
      BasePage,
      TopBarContainer,
      BipEditorSidebarContainer,
      BipEditorFormContainer
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
