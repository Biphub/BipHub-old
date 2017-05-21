<style scoped lang="scss" src="./Select.scss"></style>

<template>
  <div class="select">
    <div class="label">{{ label }}</div>
    <div class="output"
         v-on:click="selectClick" >
      <span class="output-text">{{ value }}</span>
      <span v-bind:class="outputArrowStyle">&lsaquo;</span>
    </div>
    <div v-bind:class="optionsStyle">
      <div class="option"
           v-for="option in options"
           v-on:click="optionClick(option)" >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
  import toggleClass from '../../utils/toggleClass'
  export default {
    name: 'BpSelect',
    props: {
      label: { type: String, default: '' },
      options: { type: Array, default: [] }
    },
    data () {
      return {
        value: 'Please select an option',
        optionsStyle: 'options options--close',
        outputArrowStyle: 'output-arrow output-arrow--inactive'
      }
    },
    methods: {
      selectClick () {
        const newOptionsStyle = toggleClass(this.optionsStyle, 'options--close', 'options--open')
        const newOutputArrowStyle = toggleClass(this.outputArrowStyle, 'output-arrow--inactive', 'output-arrow--active')
        this.optionsStyle = `options ${newOptionsStyle}`
        this.outputArrowStyle = `output-arrow ${newOutputArrowStyle}`
      },
      optionClick (v) {
        this.selectClick()
        this.value = v
      }
    }
  }
</script>
