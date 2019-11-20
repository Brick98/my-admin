<template>
  <Submenu :name="parent.name">
    <template slot="title">
        <Icon :type="parent.icon" />
        {{parent.meta.title}}
    </template>
     <template v-for="item in parent.children">
        <!-- 有子集 -->
        <re-submenu 
        v-if="item.children && !!item.meta.hideInMenu==false?true:false" 
        :name="item.name" 
        :key="`meun_${item.name}`"
        :parent="item"
        >
        </re-submenu>
        <!-- 无子集 -->
        <menu-item 
        v-if="!item.children && !!item.meta.hideInMenu==false?true:false" 
        :name="item.name" 
        :key="`meun_${item.name}`"
        >
        <Icon :type="item.icon" />
          {{item.meta.title}}
          </menu-item>
      </template>
  </Submenu>
</template>
<script>
export default {
  name: 'ReSubmenu',
  props:{
    parent:{
      type:Object,
      default:()=>({})
    }
  }
}
</script>
<style lang="less">

</style>

