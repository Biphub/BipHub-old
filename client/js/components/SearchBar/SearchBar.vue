<style scoped lang="scss" src="./SearchBar.scss"></style>

<template>
  <div class="search-bar">
    <div class="search-bar-pad">
      <Icon type="search"
            class="icon" ></Icon>
      <input placeholder="Search for any app name..."
             class="input" >
    </div>
  </div>
</template>

<script>
  import Icon from '../Icon'
  export default {
    name: 'BpSearchBar',
    components: {
      Icon
    }
  }
</script>
