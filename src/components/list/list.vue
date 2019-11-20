<template>
  <div>
    <ul>
      <li @mousemove.prevent="handleMove" v-for="(item, index) in list" :key="index">
        <!-- <span v-if="!render">{{item.number}}</span>
        <render-dom v-else :render-fun="render" :number="item.number"></render-dom> -->
        <slot name="aa" :number="item.number"></slot>
      </li>
    </ul>
  </div>
</template>
<script>
import RenderDom from '_c/render-dom'
export default {
  name: 'List',
  components: {
    RenderDom
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    render: {
      type: Function,
      default: () => { }
    }
  },
  methods: {
    handleMove () {

    }
  }
}
</script>
