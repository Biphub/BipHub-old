<style scoped lang="scss" src="./UserProfile.scss"></style>

<template>
  <div class="component">

    <div class="component-pad">
      <div class="photo"
           v-if="enablePhoto && photo">
        <img v-bind:src="photo"
             class="photo-image">
      </div>

      <div class="name"
           v-if="enableName">
        {{ name }}
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
    props: {
    	photo: { type: String, default: '' },
    	name: { type: String, default: 'N/A' },
    	role: { type: String, default: 'N/A' },
      enablePhoto: { type: Boolean, default: true },
      enableName: { type: Boolean, default: true },
      enableRole: { type: Boolean, default: true },
    }
  }
</script>
