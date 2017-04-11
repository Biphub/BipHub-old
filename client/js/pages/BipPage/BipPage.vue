<style scoped lang="scss" src="./BipPage.scss"></style>

<template>
  <BasePage type="control">
    <TopBarContainer type="control"></TopBarContainer>
    <div class="base-main-width">
      test
    </div>
  </BasePage>
</template>

<script>
  import BasePage from '../Base'
  import TopBarContainer from '../../containers/TopbarContainer'
  export default {
    components: {
      BasePage,
      TopBarContainer,
    }
  }
</script>
