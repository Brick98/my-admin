<template>
  <ul class="a-submenu">
    <div @click="handlClick" class="a-submenu-title">
      <slot name="title"></slot>
      <span :style="{transform:`rotateZ(${showChild ? 0 :180}deg)`}" class="shrink-icon">^</span>
    </div>
    <div v-show="showChild" class="a-submenu-child-box">
      <slot></slot>
    </div>
  </ul>
</template>
<script>
export default {
  name: 'ASubmenu',
  data () {
    return {
      showChild: false
    }
  },
  methods: {
    handlClick () {
      this.showChild = !this.showChild
    }
  }
}
</script>
<style lang="less">
.a-submenu {
  &-title {
    background-color: aquamarine;
    position: relative;
    .shrink-icon {
      position: absolute;
      top: 0;
      right: 10px;
    }
  }
  &-child-box {
    overflow: hidden;
    padding-left: 15px;
  }
}
</style>
