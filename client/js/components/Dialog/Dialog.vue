<style scoped lang="scss">
  .container {
    position: fixed;
    width: 100vh;
    height: 100vh;
    z-index: 90;
  }
  .lightbox {
    width: 100vh;
    height: 100vh;
    background: rgba(0,0,0,.5);
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 91;
  }
  .component {
    width: 50%;
    height: 50%;
    z-index: 92;
  }
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<template>
  <div class="container"
       v-if='this.dataOpen'
  >
    <div class="lightbox"
         v-on:click='onClickLightbox'
    >
    </div>
    <div class='component'
         v-on:click='onClickComponent'
    >
      <slot>
        <div class="placeholder">
          <div>No content was passed into the component!</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BpDialog',
    props: {
      open: { type: Boolean, default: true }
    },
    methods: {
      onClickLightbox () {
        this.$emit()
      },
      onClickComponent () {
        console.log('component click!')
      }
    }
  }
</script>
