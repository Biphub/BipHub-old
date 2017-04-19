<style scoped lang="scss" src="./UserProfile.scss"></style>

<template>
  <div to="/bip" class="component">
    
    <div class="component-pad">
      <div class="photo"
           v-if="enablePhoto && photo">
        <img v-bind:src="photo"
             class="photo-image">
      </div>

      <div class="name"
           v-if="enableName">
        <span v-if="!enableWelcome" class="name-text">{{ name }}</span>
        <span v-if="enableWelcome" class="name-text">{{ welcome }}</span>
        <span class="name-arrow name-arrow--inactive">&lsaquo;</span>
      </div>

      <div class="role"
           v-if="enableRole">
        {{ role }}
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'BpUserProfile',
    props: {
      photo: { type: String, default: '' },
      name: { type: String, default: 'N/A' },
      role: { type: String, default: 'N/A' },
      enablePhoto: { type: Boolean, default: false },
      enableName: { type: Boolean, default: false },
      enableRole: { type: Boolean, default: false },
      enableWelcome: { type: Boolean, default: false }
    },
    computed: {
      welcome () {
        return `Hello, ${this.name} `
      }
    }
  }
</script>
