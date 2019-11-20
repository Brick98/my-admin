<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left" :style="{width: leftOffsetPercent, paddingRight: `${treeWidth/2}px`}">
      <button @click="handClick">change</button>
      <slot name="left"></slot>
    </div>
    <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{left: treeLeft,width: `${treeWidth}px`}">
    </div>
    <div class="pane pane-right" :style="{left: leftOffsetPercent,paddingLeft: `${treeWidth/2}px`}">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      canMover: false, // 状态
      initOffset: 0 // 中间条初始偏移量
    }
  },
  props: {
    value: {
      type: Number,
      default: 0.5
    },
    treeWidth: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  computed: {
    leftOffsetPercent () {
      return `${this.value * 100}%`
    },
    treeLeft () {
      return `calc(${this.leftOffsetPercent} - ${this.treeWidth / 2}px)`
    }
  },
  methods: {
    handClick () {
      this.value -= 0.02
    },
    handleMousedown (event) {
      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseup)
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
      this.canMover = true
    },
    handleMousemove (event) {
      // console.log(this.$refs.outer.getBoundingClientRect().left)
      // 偏移量
      if (!this.canMover) return
      const auterRect = this.$refs.outer.getBoundingClientRect()
      // 偏移量 - 鼠标在条上的距离 + 条一半的宽度
      // 偏移百分比
      let offsetPercent = (event.pageX - this.initOffset + (this.treeWidth / 2) - auterRect.left) / (auterRect.width)
      if (offsetPercent < this.min) offsetPercent = this.min
      if (offsetPercent > this.max) offsetPercent = this.max
      // 子组件想改变父组件的值
      // this.$emit('input', offsetPercent)
      this.$emit('update:value', offsetPercent)
      // this.leftOffset = offsetPercent
    },
    handleMouseup () {
      this.canMover = false
    }
  }
}
</script>
<style lang="less">
.split-pane-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .pane {
    position: absolute;
    height: 100%;
    top: 0;
    &-left {
      // width: 30%;
      background: palevioletred;
    }
    &-right {
      right: 0;
      bottom: 0;
      // left: 30%;
      background: palegreen;
    }
    &-trigger-con {
      height: 100%;
      background: red;
      z-index: 10;
      // width: 10px;
      position: absolute;
      top: 0;
      height: 100%;
      user-select: none;
      cursor: col-resize;
    }
  }
}
</style>
