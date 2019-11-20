<template>
  <Form ref="form" v-if="Object.keys(valueList).length" :label-width="labelWidth" :model="valueList" :rules="rules">
    <FormItem 
    v-for="(item,index) in list"
    :label="item.label"
    lebel-position="left"
    :key="`${_uid}_${index}`"
    :prop="item.name"
    :error="errorStore[item.name]"
    @click.native="handleFocus(item.name)"
    >
      <component 
      :is="item.type"
      :range="item.range"
      v-model="valueList[item.name]"
      >
        <template v-if="item.children">
          <component 
          v-for="(child,i) in item.children.list" 
          :is="item.children.type" 
          :key="`${_uid}_${index}_${i}`" 
          :label="child.label"
          :value="child.value">
            {{child.title}}
          </component>
        </template>
      </component>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">提交</Button>
      <Button @click="handleReset">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
import clonedeep from 'clonedeep'
import { sentFormData } from '@/api/data'
export default {
  name:'formGroup',
  data(){
    return{
      initValueList: [],// 初始值
      valueList:{}, // model绑定值
      rules:{}, // 验证对象
      errorStore:{} // 错误对象
    }
  },
  props:{
    list:{
      type:Array,
      default:()=>[]
    },
    labelWidth:{
      type:Number,
      default:100
    },
    url:{
      type:String,
      required:true
    }
  },
  watch:{
    list(){
      this.setInitValue()
    }
  },
  methods:{
    // 设置传入的对象
    setInitValue(){
      // 重置集合
      let initValueList = {}
      // model数据集合
      let valueList= {}
      // 规则集合
      let rules = {}
      // 错误提示
      let errorStore = {}
      this.list.forEach(item => {
        rules[item.name] = item.rule
        valueList[item.name] = item.value
        initValueList[item.name] = item.value
        errorStore[item.name] = ''
      })
      this.rules = rules
      this.valueList = valueList
      this.initValueList = initValueList
      this.errorStore = errorStore
    },
    handleSubmit(){
      this.$refs.form.validate(valid=> {
        if (valid) {
          sentFormData({
            url:this.url,
            data:this.valueList
          }).then(res =>{
            this.$emit('on-submit-success',res)
          }).catch(err =>{
            this.$emit('on-submit-error',err)
            for (let key in err) {
              this.errorStore[key] = err[key]
            }
          })
        }
      })
    },
    handleReset(){
      // 深拷贝初始值 否则引用类型会改变initvalueList 初始值
      this.valueList = clonedeep(this.initValueList)
    },
    handleFocus(name) {
      // 返回的错误 重新显示 后台例如密码错误提示
      this.errorStore[name] = ''
    }
  },
  mounted(){
    this.setInitValue()
  }
}
</script>
<style lang="less">

</style>
