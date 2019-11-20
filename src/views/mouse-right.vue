<template>
    <div class="upload">
    <div class="clickdiv" v-for="(item, index) in 5" :a="index"  @mousedown="setPageMenu(index)" ref="menuItem">{{index}}
    </div>
    
    <vue-context-menu v-if="hackReset" class="right-menu" 
      :target="contextMenuTarget" 
      :show="contextMenuVisible" 
      @update:show="(show) => contextMenuVisible = show">
      <a href="javascript:;" @click="copyMsg">复制</a>
      <a href="javascript:;" @click="copyMsg">引用</a>
      <a href="javascript:;" @click="copyMsg">删除</a>
    </vue-context-menu>

    
  </div>
</template>
<script>
import { component as VueContextMenu } from '@xunlei/vue-context-menu'
export default {
  components:{
    VueContextMenu
  },
  data(){
    return {
      hackReset:true,
      menuItemSelect:0,
      contextMenuTarget:{},
      contextMenuVisible:false
    }
  },
  methods:{
     copyMsg(){
      console.log(this.menuItemSelect)
    },
    setPageMenu(index){
     this.menuItemSelect = index
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
        this.contextMenuTarget = this.$refs.menuItem[index]
      })
    }
  },
  mounted(){
    this.contextMenuTarget = this.$refs.menuItem[1]
    console.log(this.$refs.menuItem[1])


  }
}
</script>
<style lang="less">
.upload{


.clickdiv{
  height: 200px;
  background: #42b983;
  border-bottom: 1px solid red;
  margin-bottom: 5px;
}
.clickdiv2{
  height: 200px;
  background:#333;
}
body {
  height: 100%;
  font-size: 14px;
}
#app {
  font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
h1,
h2 {
  font-weight: normal;
}
a {
  color: #333;
}
.right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, .2);
  border-radius: 3px;
  z-index: 999;
  display: none;
}
.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}
html,
body {
    height: 100%;
}
.right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
    border-radius: 1px;
}
a {
    text-decoration: none;
}
.right-menu a {
    padding: 2px;
}
.right-menu a:hover {
    background: #42b983;
}

}
</style>