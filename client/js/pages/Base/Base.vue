<style scoped lang="scss" src="./Base.scss"></style>

<template>
  <div>
    <div v-if="type === 'dashboard'" class="page">
      <!--
      <div is="SidebarContainer"
           class="sidebar" >
      </div>
      -->
  
      <div class="main">
        <div is="TopbarContainer"
             class="topbar" >
        </div>
        <slot></slot>
      </div>
  
    </div>
    <div v-if="type === 'control'" class="page">
      <div class="main">
        <TopbarContainer type="control"></TopbarContainer>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import TopbarContainer from '../../containers/TopbarContainer'
  import SidebarContainer from '../../containers/SidebarContainer'
  export default {
    created () {
      console.log('created base page ')
    },
    props: {
      type: { type: String, default: 'dashboard' }
    },
    components: {
      TopbarContainer,
      SidebarContainer
    }
  }
</script>
