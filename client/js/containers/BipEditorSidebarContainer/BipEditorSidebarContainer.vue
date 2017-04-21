<style scoped lang="scss" src="./BipEditorSidebarContainer.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <div>
        <label>Name your bip</label>
        <input type="text" />
      </div>
      <div class="progress">
        <bp-steps v-bind:steps="steps"
                  v-on:getApps="getApps"
                  v-on:chooseApp="chooseApp"
                  v-on:getEvents="getEvents"
                  v-on:chooseEvent="chooseEvent"
        ></bp-steps>
      </div>
    </div>
  </div>
</template>

<script>
  import Steps from '../../components/Steps'
  export default {
    data () {
      return {
        steps: []
      }
    },
    components: {
      Steps
    },
    methods: {
      /**
       * App panel
       * Search for apps
       */
      getApps () {
        console.log('INFO: Bip Editor sidebar: searching apps!')
      },
      /**
       * Choose an app for either incoming action or outgoing action
       */
      chooseApp (eventType, appId) {
        console.log('INFO: chose an app!')
      },
      /**
       *
       * @param appId
       */
      getEvents (appId) {
        console.log('INFO: Getting events!')
      },
      /**
       *
       * @param eventType
       * @param eventId
       */
      chooseEvent (eventType, eventId) {
      }
    }
  }
</script>
