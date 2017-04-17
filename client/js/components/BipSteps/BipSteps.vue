<style scoped lang="scss" src="./BipSteps.scss"></style>
<template>
  <div class="container">
    <div class="row"
         v-for="step in steps">
      <div class="column-left">
        <img src="/static/bipflow-logo-standalone.png">
      </div>
      <div class="column-right">
        <ul>
          <li v-for="task in step.tasks">
            <MenuItem flexDirection="row"
                      v-bind:iconType="getIconType(task.active)"
                      label="task.label"
                      v-bind:padding="false"
            ></MenuItem>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuItem from '../../components/MenuItem'
  /**
   * tasks :
   * [ { label: "choose an app", active: true } ]
   */
  export default {
    props: {
      steps: { type: Array, default: [] }
    },
    components: {
      MenuItem
    },
    methods: {
      getIconType (active) {
        return active ? 'pencil' : 'lock'
      },
      findStepType () {

      }
    }
  }
</script>
