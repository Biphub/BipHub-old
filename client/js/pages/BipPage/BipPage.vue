<style scoped lang="scss" src="./BipPage.scss"></style>

<template>
  <BasePage type="control">
    <div class="base-main-width container">
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
  import BasePage from '../Base'
  import TopBarContainer from '../../containers/TopbarContainer'
  import BipSidebarContainer from '../../containers/BipSidebarContainer'
  export default {
    components: {
      BasePage,
      TopBarContainer,
      BipSidebarContainer,
    }
  }
</script>
