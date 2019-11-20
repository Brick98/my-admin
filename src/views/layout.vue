<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider :width="200" hide-trigger collapsible v-model="collapsible" class="sider-outer">
        <side-menu 
        :collapsible="collapsible"
        :list="routers"
        >

        </side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClass" @click.native="handleCollnpsed" type="md-menu" :size="32"></Icon>
        </Header>
        <Content class="content-con">
          <div>
            <Tabs @on-click="handleClicTabs" type="card" :animated="false" :value="getTabNameByRoute($route)">
              <TabPane :label="labelRender(item)" :name="getTabNameByRoute(item)" v-for="(item,index) in tabList" :key="`tabNav${index}`"></TabPane>
            </Tabs>
          </div>
          <div class="view-box">
            <Card class="page-card" >
              <router-view/>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SideMenu from '_c/side-menu'
import { mapState, mapActions } from 'vuex'
import { getTabNameByRoute, getRouteById } from '@/lib/util'
export default {
  data () {
    return {
      collapsible: false,
      getTabNameByRoute // 对象转指定字符串 如果方法用到$要挂载到实例上
    }
  },
  watch:{
  },
  components:{
    SideMenu
  },
  methods: {
    ...mapActions([
      'handleRemove'
    ]),
    handleCollnpsed () {
      this.collapsible = !this.collapsible
    },
    handleClicTabs (id) {
      let obj = getRouteById(id)
      this.$router.push(obj)
    },
    handleTabRemove(id,event){
      //禁止冒泡
      event.stopPropagation()
      console.log(this.$route)
      this.handleRemove({
        id,
        $route:this.$route
      }).then(nextRoute => {
        console.log(nextRoute)
        this.$router.push(nextRoute)
      })
    },
    labelRender(item){
      return h => {
        return (
          <div>
            <span>{item.meta.title}</span>
            <icon style="lineHeight:12px;marginLeft:5px;" type="md-close-circle" nativeOn-click = {this.handleTabRemove.bind(this,getTabNameByRoute(item))}></icon>
          </div>
        )
      }
    }
  },
  computed: {
    triggerClass () {
      return [
        'trigger-icon',
        this.collapsible ? 'rotate' : ''
      ]
    },
    ...mapState({
      tabList: state => state.tabNav.tabList,
      routers:state => state.router.routers.filter(item => {
        return item.path !== '*' && item.name !== 'login'
      })
    })
  }
}
</script>
<style lang="less">
.layout-wrapper,.layout-outer{
  height: 100%;
  .header-wrapper{
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
    padding: 0 23px;
    .trigger-icon{
      cursor: pointer;
      transition: transform .3s ease;
    }
    .rotate{
      transform: rotateZ(-90deg);
      transition: transform .3s ease;
    }
  }
  .content-con{
    padding: 0;
    .ivu-tabs-bar{
      margin-bottom: 0;
    }
    .view-box{
      padding: 0
    }
  }
  .page-card{
    min-height: ~"calc(100vh - 84px)";
  }
  .sider-outer{
    height: 100%;
    overflow: hidden;
    .ivu-layout-sider-children{
      overflow-y:scroll;
      overflow-x: hidden;
    }
  }
}
</style>

