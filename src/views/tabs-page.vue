<template>
  <div>
    <Tabs v-model="tabsValue" type="card"  closable @on-tab-remove="handleTabRemove">
        <TabPane v-for="(tab,index) in tabs" :key="tab" :label="'标签' + tab">标签{{ tab }}</TabPane>
        
        <Button @click="handleTabsAdd" size="small" slot="extra">增加</Button>
        
    </Tabs>
    <Button @click="handleClick"></Button>
  </div>
    
</template>
<script>
    export default {
        data () {
            return {
              tabsValue:0,
                tabs: 2
            }
        },
        methods: {
            handleTabsAdd () {
              console.log(this.tabs)
              console.log(this['tab'+(this.tabs-1)])
              if(this['tab'+(this.tabs-1)]==false){
                this['tab'+(this.tabs-1)]=true
                this.tabs --
                if(this['tab'+(this.tabs)]!=false){
                  this.$nextTick(()=>{
                    this.tabs = this.tabs+1;
                  })
                }
              }else{
                this.tabs ++;
              }
                
            },
            handleTabRemove (name) {
            if(name == 0 ) return
              console.log(name)
                this['tab' + name] = false;
                console.log(this['tab' + name])
            },
            handleClick(){
              console.log(this.tabsValue)
            }
        }
    }
</script>