<template>
  <canvas class="canvas-gauges"></canvas>
</template>

<script>
import { RadialGauge } from 'canvas-gauges'
import throttle from 'lodash/throttle'
let setValue = throttle((guage, value) => {
  guage.value = value
}, 1000, { trailing: true })
export default {
  props: {
    value: Number,
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    if (this.value) { this.options.value = this.value }
    this.options.renderTo = this.$el
    this.chart = new RadialGauge(this.options).draw()
  },
  beforeDestroy () {
    this.chart.destroy()
  },
  watch: {
    options: {
      deep: true,
      handler (options) {
        this.chart.update(options)
      }
    },
    value (value) {
      setValue(this.chart, value)
    }
  }
}
</script>
