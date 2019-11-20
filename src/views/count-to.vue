<template>
  <div>
    <count-to ref="countTo" @on-animation-end="handleEnd" :end-val='endVal' >
     <span slot="left">总金额：</span>
     <span slot="right"> 元</span>
    </count-to>
    <button @click="getNumber">获取数值</button>
    <button @click="updateNumber">更新数值</button>
  </div>
</template>
<script>
import CountTo from '@/components/count-to'
export default {
  name: 'count_to',
  components: {
    CountTo
  },
  data () {
    return {
      endVal: 100
    }
  },
  methods: {
    getNumber () {
      this.$refs.countTo.getCount()
    },
    updateNumber () {
      this.endVal += parseInt(Math.random() * 100)
    },
    handleEnd (endVal) {
      console.log(`endval -> ${endVal}`)
    }
  }
}
</script>
