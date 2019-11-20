<template>
  <a-submenu>
    <div slot="title">{{parent.title}}</div>
    <template v-for="(item, i) in parent.children">
      <a-menu-item v-if="!item.children" :key="`menu_item_${index}_${i}`">{{item.title}}</a-menu-item>
      <re-submenu v-else :key="`menu_item_${index}_${i}`" :parent="item" :index="i"></re-submenu>
    </template>
  </a-submenu>
</template>
<script>
import menuComponents from '_c/menu'
const { ASubmenu, AMenuItem } = menuComponents
export default {
  name: 'ReSubmenu',
  components: {
    ASubmenu,
    AMenuItem
  },
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    index: Number
  }
}
</script>
