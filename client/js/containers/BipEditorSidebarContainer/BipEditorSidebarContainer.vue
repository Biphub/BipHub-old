<style scoped lang="scss" src="./BipEditorSidebarContainer.scss"></style>

<template>
  <div class="container">
    <div class="row">
      <div>
        <label>Name your bip</label>
        <input type="text" />
      </div>
      <div class="progress">
        <div>Choose a trigger</div>
        <div>Set actions</div>
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
      },
      /**
       * Choose an app for either incoming action or outgoing action
       */
      chooseApp (eventType, appId) {
      },
      /**
       *
       * @param appId
       */
      getEvents (appId) {
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
