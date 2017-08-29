<style scoped lang="scss">
  .container-page {
    display: flex;
    height: 100%;
  }
  
  .page {
    height: 100%;
    width: 100%;
    display: flex;
  }
  
  .sidebar {
    width: 160px;
  }
  
  .main {
    width: 100%;
    height: 100%;
    text-align: left;
    margin: 0 auto;
  }
</style>

<template>
  <div class="container-page">
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
  import TopbarContainer from '../containers/TopbarContainer/index'
  import SidebarContainer from '../containers/SidebarContainer/index'
  export default {
    created () {
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
