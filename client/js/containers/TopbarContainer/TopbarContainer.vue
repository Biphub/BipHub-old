<style scoped lang="scss" src="./TopbarContainer.scss"></style>

<template>
    <div class="topbar">
      <div class="topbar-wrapper base-main-width">
        <div class="topbar topbar-left">
            <MenuItem class="component-top"
                      iconType="bars"
            ></MenuItem>
            <MenuItem class="component-top"
                      iconType="diamond"
            ></MenuItem>
            <MenuItem class="component-top"
                      iconType="expand"
            ></MenuItem>
            <MenuItem class="component-top"
                      iconType="cogs"
            ></MenuItem>
        </div>

        <div class="topbar empty"></div>

        <div class="topbar topbar-right">
            <MenuItem class="component-top"
                      iconType="search"
            ></MenuItem>
            <MenuItem class="component-top"
                      iconType="envelope"
            ></MenuItem>
            <MenuItem class="component-top"
                      iconType="bell"
            ></MenuItem>
            <MenuItem class="component-top"
                      iconType="sign-out"
                      label="logout"
                      flexDirection="row"
            ></MenuItem>
            <MenuItem class="component-top"
                      iconType="comments"
            ></MenuItem>
        </div>
      </div>
    </div>

</template>

<script>
import MenuItem from 'components/MenuItem'
import UserProfile from 'components/UserProfile'

export default {
  components: {
    MenuItem,
    UserProfile,
  }
}
</script>
