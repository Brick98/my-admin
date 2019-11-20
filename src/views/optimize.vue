<template>
  <div>
    <!-- <Select v-model="selectData" style="width:200px">
      <vitual-list :size="30" :remain="6">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </vitual-list>
    </Select>
    <Select v-model="selectData" style="width:200px">
        <vitual-list :size="30" :remain="6">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </vitual-list>
    </Select>
    <Select v-model="selectData" style="width:200px">
        <vitual-list :size="30" :remain="6">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </vitual-list>
    </Select>
    <Select v-model="selectData" style="width:200px">
        <vitual-list :size="30" :remain="6">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </vitual-list>
    </Select> -->
    <CheckboxGroup v-model="checkedArr">
      <vitual-list :size="30" :remain="6">
        <p v-for="item in list" :key="`check${item.value}`" style="height: 30px">
          <Checkbox :label="item.value">
            <Icon type="logo-twitter"></Icon>
            <span>{{item.label}}</span>
          </Checkbox>
        </p>
      </vitual-list>
    </CheckboxGroup>
  </div>
</template>
<script>
import { doCustomTimes } from '@/lib/tools'
import VitualList from 'vue-virtual-scroll-list'
export default {
  components:{
    VitualList
  },
  data(){
    return{
      list:[],
      cityList:[],
      selectData:0,
      checkedArr:[]
    }
  },
  mounted(){
    let list = []
    doCustomTimes(1000,(index)=>{
      list.push({
        value: index,
        label:`select${index}`
      })
    })
    this.list = list
  }
}
</script>
<style lang="less">

</style>
