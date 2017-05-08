<style scoped lang="scss" src="./SidebarContainer.scss"></style>

<template>
  <div class="container-side">
    <bp-logo-text></bp-logo-text>
    <bp-user-profile class="side-user-profile"
                 photo="/static/profile-menu-image.png"
                 name="jason"
                 role="developer"
    ></bp-user-profile>
    <bp-user-profile class="component-side--active"
              iconType="home"
              label="home"
    ></bp-user-profile>
    <bp-user-profile class="component-side"
              iconType="bandcamp"
              label="bips"
    ></bp-user-profile>
    <bp-user-profile class="component-side"
              iconType="grav"
              label="profile"
    ></bp-user-profile>
  </div>
</template>

<script>
  export default {
  };
</script>
