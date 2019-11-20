<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" :active-name="$route.name" :open-names="openNames" v-show="!collapsible" @on-select="handleSelect" width="auto" theme="dark">
      <template v-for="item in list">

        <re-submenu 
        v-if="item.children && !!item.meta.hideInMenu==false?true:false" 
        :name="item.name" 
        :key="`meun_${item.name}`"
        :parent="item"
        >
        </re-submenu>

        <menu-item v-if="!item.children && !!item.meta.hideInMenu==false?true:false" :name="item.name" :key="`meun_${item.name}`">
          <Icon :type="item.icon" />
          {{item.meta.title}}
          </menu-item>
      </template>
    </Menu>
    <div v-show="collapsible" class="deop-wrapper">
      <template  v-for="item in list">
        
        <re-dropdown v-if="item.children" 
        :key="`deop_${item.name}`" 
        :parent="item"
        icon-color="#fff"
        :show-title="false"
        @on-select="handleSelect"
        >

        </re-dropdown>
        <Tooltip v-else
        placement="right" transfer 
        :content="item.meta.title" 
        :key="`drop_${item.name}`"
        >
          <span @click="handleClick(item.name)" class="drop-menu-span">
            <Icon :type="item.icon" color="#fff" :size="22"/>
          </span>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import ReSubmenu from './re-submenu.vue'
import ReDropdown from './re-dropdown.vue'
import { mapState } from 'vuex'
import { getOpenArrByName } from '@/lib/util'
export default {
  name:'SideMenu',
  data(){
    return{

    }
  },
  components:{
    ReSubmenu,
    ReDropdown
  },
  props:{
    collapsible: {
      type:Boolean,
      default:false
    },
    list:{
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 菜单集合
    ...mapState({
      routers: state => state.router.routers
    }),
    // 展开的菜单
    openNames () {
      return getOpenArrByName(this.$route.name, this.routers)
    }
  },
  watch:{
    openNames(){
      // 手动更新展开的子目录
      this.$nextTick(()=> {
        this.$refs.menu.updateOpened()
      })
    }
  },
  methods: {
    handleSelect (name){
      console.log(name)
      this.$router.push({name})
    },
    handleClick (name) {
      console.log(name)
    }
  }
}
</script>
<style lang="less">
  .side-menu-wrapper{
    width: 100%;
    .ivu-tooltip,.drop-menu-span{
      text-align: center;
      display: block;
      width: 100%;
      padding: 5px 0;
    }
    .deop-wrapper>.ivu-dropdown{
      display: block;
      margin: 0 auto;
      padding: 5px; 
    }
  }
</style>
