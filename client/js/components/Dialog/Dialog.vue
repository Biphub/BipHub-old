<style module lang="scss">
  .container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 90;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
  }
  .lightbox {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    z-index: 91;
  }
  .component {
    width: 80%;
    height: 50%;
    z-index: 92;
    position: fixed;
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
  <div v-bind:class="$style.container"
       v-if='this.open'
  >
    <div v-bind:class="$style.lightbox"
         v-on:click='onClickLightbox'
    >
    </div>
    <div v-bind:class='$style.component'
         v-on:click='onClickComponent'
    >
      <slot>
        <div v-bind:class="$style.placeholder">
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
      open: { type: Boolean, default: false }
    },
    methods: {
      /**
       * Event to close dialog
       */
      onClickLightbox () {
        this.$emit('onClose')
      },
      onClickComponent () {
        console.log('component click!')
      }
    }
  }
</script>
