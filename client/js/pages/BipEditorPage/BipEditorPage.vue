<style scoped lang="scss" src="./BipEditorPage.scss"></style>

<template>
  <BasePage type="control">
    <div class="container">
      <div class="row">
        <BipSidebarContainer class="column-left"
        ></BipSidebarContainer>
        <div class="column-right">
          test column right
        </div>
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
  import BipSidebarContainer from '../../containers/BipSidebarContainer'
  export default {
    components: {
      BasePage,
      TopBarContainer,
      BipSidebarContainer
    }
  }
</script>
