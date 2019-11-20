<template>
  <div class="folder">
    <Tree :data="folderTree" :render="renderFunc"></Tree>
    <div ref="div"></div>
    <vue-context-menu v-if="hackReset" ref="menu" class="right-menu" 
      :target="contextMenuTarget" 
      :show="contextMenuVisible" 
      @update:show="(show) => contextMenuVisible = show">
      
      <a v-for="(item,index) in ItemList" href="javascript:;" @click="copyMsg(item.name)">{{item.title}}</a>
      
    </vue-context-menu>
  </div>
</template>
<script>
import clonedeep from 'clonedeep'
import { putFileInFolder, transferFolderToTree, expandSpecifiedFolder } from '@/lib/util'
import { component as VueContextMenu } from '@xunlei/vue-context-menu'
export default {
  components:{
    VueContextMenu
  },
  name: 'FolderTree',
  data () {
    return {
      // 鼠标右键变量
      ItemList:[],// 操作列表
      ItemData:{},// 操作对象
      hackReset:true,
      menuItemSelect:0,
      contextMenuTarget:{},
      contextMenuVisible:false,

      currentRenamingId:'', // 标记id
      currentRenamingContent:'', // 输入文字
      folderTree: [],
      renderFunc: (h, { root, node, data }) => {
        const dropList = data.type === 'folder' ? this.folderDrop : this.fileDrop
        // const dropdownRender = dropList.map(item => {
        //   return (<dropdownItem name={item.name}>{item.title}</dropdownItem>)
        // })
        const isRenaming = this.currentRenamingId === `${data.type || 'file'}_${data.id}`
        return (
          <div class="tree-item" ref="ItemTree">
          { data.type == 'folder' ? <icon type="ios-folder" color="#2d8cf0" style="marginRight:5px" /> : '' }
          { 
            isRenaming ?
            <span>
              <i-input value={data.title} on-input={this.handleInput} class="tree-rename-input"></i-input>
              <i-button size="small" type="text" on-click={this.saveRename.bind(this,data)}>
                <icon type="md-checkmark"></icon>
              </i-button>
              <i-button>
                <icon type="md-close"></icon>
              </i-button>
            </span>
            :
            <span  on-mousedown={this.setPageMenu.bind(this,node.nodeKey,data)} 
            ind={node.nodeKey} 
            id={"menuItem"+node.nodeKey}
            >
              {data.title}
              <i-button size="small" type="text" class="tree-item-button">
                <icon type="md-more" size="{12}"></icon>
              </i-button>
            </span>
          }
          {
            // dropList && !isRenaming ? 
            // <dropdown placement="right-start" on-on-click={this.handleDropdownClick.bind(this, data)}>
            //   <i-button size="small" type="text" class="tree-item-button">
            //     <icon type="md-more" size="{12}"></icon>
            //   </i-button>
            //   <dropdownMenu slot="list">
            //     {dropdownRender}
            //   </dropdownMenu>
            // </dropdown>
            // : ''
          }
          
          </div>
        )
      }
    }
  },
  props:{
    folderList:{
      type:Array,
      default:()=>[]
    },
    fileList: {
      type:Array,
      default:()=>[]
    },
    folderDrop:Array,
    fileDrop:Array,
    beforeDelete: Function
  },
  watch:{
    folderList(){
      this.transData()
    },
    fileList(){
      this.transData()
    }
  },
  methods:{
    transData () {
      this.folderTree = transferFolderToTree(putFileInFolder(this.folderList,this.fileList))
      this.contextMenuTarget = this.$refs.div
    },
    isFolder (type) {
      return type === 'folder'
    },
    handleDelete (data) {
      const folderId = data.folder_id
      const isFolder = this.isFolder(data.type)
      const updateListName = isFolder ? 'folderList' : 'fileList'
      let list = isFolder ? clonedeep(this.folderList) :clonedeep(this.fileList)
      list = list.filter(item => item.id !== data.id)
      this.$emit(`update:${updateListName}`, list)
      this.$nextTick (() => {
        expandSpecifiedFolder(this.folderTree, folderId)
      })
    },
    handleDropdownClick (data, name) {
      this.contextMenuVisible = !this.contextMenuVisible//隐藏操作
      const folderId = data.folder_id
      if(name === 'rename'){
        this.currentRenamingId = `${data.type || 'file'}_${data.id}`
      }else if(name === 'delete'){
        this.$Modal.confirm({
          title: '提示',
          content: `您确定要删除${this.isFolder(data.type)?"文件夹" : "文件"} 《${data.title}》吗?`,
          onOk: () =>{
            this.beforeDelete ? this.beforeDelete().then(()=> {
              this.handleDelete(data)
            }).catch(()=> {
              this.$Message.error('删除失败')
            }) : this.handleDelete(data)
            
            
          }
        })
      }
    },
    handleInput (val) {
      this.currentRenamingContent = val
    },
    updateList (list, id) {
      let i = -1
      let len = list.length
      while (++i < len) {
        const item = list[i]
        if(item.id === id){
          // 会触发watch 重新加载 transData 扁平数据处理
          item.name = this.currentRenamingContent
          list.splice(i, 1, item)
          break
        }
      }
      return list
    },
    saveRename (data){
      console.log(this.currentRenamingContent)
      this.currentRenamingContent = this.currentRenamingContent==""? data.title : this.currentRenamingContent
      let id = data.id
      let type = data.type
      if(type === 'folder'){
        // 不修父组件传来的改原始数据
        const list = this.updateList(clonedeep(this.folderList), id)
        // 修改多个值 替代v-model
        this.$emit('update:folderList', list)
      }else{
        const list = this.updateList(clonedeep(this.fileList), id)
        // 修改多个值 替代v-model
        this.$emit('update:fileList', list)
      }
      this.currentRenamingId = ''
      this.currentRenamingContent = ''
    },
    // 鼠标 右键事件
    copyMsg(name){
      this.handleDropdownClick(this.ItemData,name)
    },
    setPageMenu(index,data){
      const dropList = data.type === 'folder' ? this.folderDrop : this.fileDrop
      
      // const dropdownRender = dropList.map(item => {
      //     return (<a href="javascript:;" click={this.copyMsg(item.name,data)}>{item.title}</a>)
      //   })
      //   console.log(dropdownRender)
      this.ItemList = dropList
      this.ItemData = data
      console.log(dropList)
      // document.getElementById(`menuItem${index}`)
      console.log(document.getElementById(`menuItem${index}`))
     this.menuItemSelect = index
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
        this.contextMenuTarget = document.getElementById(`menuItem${index}`)
      })
    }
  },
  mounted(){
    this.transData()
    
  }
}
</script>
<style lang="less">
  .tree-item-button{
    display: none;
  }
  .tree-item:hover{
    .tree-item-button{
      display: inline;
    }
  }
  .tree-item{
    padding-left: 5px;
    display: inline-block;
    width: ~'calc( 100% - 50px )';
    height: 30px;
    line-height: 30px;
    & > .ivu-dropdown{
      float: right;
    }
    ul.ivu-dropdown-menu{
      padding-left: 0;
    }
    li.ivu-dropdown-item{
      margin: 0;
      padding: 7px 16px;
    }
    .tree-rename-input{
      width: ~'calc(100% - 80px)'
    }
  }

.folder{


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
