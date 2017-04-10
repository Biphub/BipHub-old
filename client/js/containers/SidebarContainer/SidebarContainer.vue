<style scoped lang="scss" src="./SidebarContainer.scss"></style>

<template>
  <div class="container-side">
    <LogoText></LogoText>
    <UserProfile class="side-user-profile"
                 photo="/static/profile-menu-image.png"
                 name="jason"
                 role="developer"
    ></UserProfile>
    <MenuItem class="component-side--active"
              iconType="home"
              label="home"
    ></MenuItem>
    <MenuItem class="component-side"
              iconType="bandcamp"
              label="bips"
    ></MenuItem>
    <MenuItem class="component-side"
              iconType="grav"
              label="profile"
    ></MenuItem>
  </div>
</template>

<script>
  import LogoText from '../../components/LogoText'
  import UserProfile from '../../components/UserProfile'
  import MenuItem from '../../components/MenuItem'

  export default {
    components: {
      LogoText,
      UserProfile,
      MenuItem
    }
  }
</script>
