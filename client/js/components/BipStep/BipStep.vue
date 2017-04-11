<template>
  <div></div>
</template>

<script>
  /**
   * Apps: user must choose an app which represents an agent
   */
  export default {
    props: {
      apps: { type: Array, default: [] },
      events: { type: Array, defualt: [] },
      actions: { type: Array, default: [] }
    }
  }
</script>
