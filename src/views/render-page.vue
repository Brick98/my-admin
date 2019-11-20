<template>
  <div>
    <!-- <ul @click="handleClick">
      <li @click.stop="handleClick" v-for="(item, index) in list" :key="index">{{item.name}}</li>
    </ul> -->
    <!-- <list :list="list" :render="renderFun"></list> -->
    <list :list="list">
      <!-- <count-to slot-scope="count" :end-val="count.number"></count-to> -->
      <!-- 解构式插槽 -->
      <count-to slot="aa" slot-scope="{number}" :end-val="number"></count-to>
    </list>
  </div>
</template>
<script>
import List from '_c/list'
import CountTo from '_c/count-to'
export default {
  data () {
    return {
      list: [
        { number: 100 },
        { number: 999 }
      ]
    }
  },
  components: {
    List,
    CountTo
  },
  methods: {
    handleClick (event) {
      console.log(event)
    },
    handleEnd (val) {
      console.log(val)
    },
    renderFun (h, number) {
      // return h('i', {
      //   style: {
      //     color: 'pink'
      //   }
      // }, name)
      return (
        // <i on-click={this.handleClick} style={{ color: 'pink' }}>{name}</i>
        // 组件： on-  绑定自定义事件
        // 组件： nativeOn- 原生事件
        <CountTo nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd} endVal={number}>{name}</CountTo>
      )
    }
  }
}
</script>
