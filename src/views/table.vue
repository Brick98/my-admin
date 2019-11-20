<template>
  <div>
    <!-- <edit-table :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table> -->
    <edit-table-mul :columns="columns" v-model="tableData"></edit-table-mul>
    <Button @click="turnTo">动态参数</Button>
  </div>
</template>
<script>
import {getTableData} from '@/api/data'
import EditTable from '_c/edit-table'
import EditTableMul from '_c/edit-table-mul'
export default {
  data () {
    return {
      tableData: [],
      columns: [
          { key: 'name', title: '姓名'},
          { key: 'age', title: '年龄', editable: true},
          { key: 'email', title: '邮箱', editable: true},
        ]
    }
  },
  components:{
    EditTable,
    EditTableMul
  },
  methods:{
    handleEdit ({row,index,column,newVal}) {
      console.log(row,index,column,newVal)
    },
    turnTo () {
      let id = 'params' + (Math.random() * 100).toFixed(0)
      this.$router.push({
        name:'params',
        params:{
          id
        }
      })
    }
  },
  mounted () {
    getTableData().then(res => {
      // console.log(res)
      this.tableData = res
    })
  }
}
</script>
