<template>
  <Table :columns="insideColumns" :data="value"></Table>
</template>
<script>
import clonedeep from "clonedeep";
export default {
  name: "EditTable",
  data() {
    return {
      insideData: [],
      editingId: "", // 判断哪列哪行标记
      insideColumns: [], // 拷贝的data数组
      editingContent: "" // input输入值
    };
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick({ row, index, column }) {
      // console.log(this.insideData[index].editingKeyArr)
      // 判断是否在编辑集合中
      let keyIndex = this.insideData[index].editingKeyArr ? this.insideData[index].editingKeyArr.indexOf(column.key) : -1
      let rowObj = this.insideData[index]
      // 保存操作
      if (keyIndex> -1) {
        // 删除当前 更新拷贝数据
        rowObj.editingKeyArr.splice(column.key, 1)
        this.insideData.splice(index, 1 ,rowObj)
       
        this.$emit("input", this.insideData);
        this.$emit("on-edit", {
          row,
          index,
          column,
          newVal: this.insideData[index] [column.key]
        });
       
      } else {
        let rowObj = this.insideData[index]
        rowObj.editingKeyArr = (rowObj.editingKeyArr) ? [...rowObj.editingKeyArr,column.key] : [column.key]
        this.insideData.splice(index, 1, rowObj)
      }
    },
    handleInput(row, index, column, newVal) {
      // 输入更新值
      this.insideData[index][column.key] = newVal;
    },
    handleColumns() {
      this.insideData = clonedeep(this.value)
      // 不能直接修改父组件传过来的值
      const insideColumns = this.columns.map(item => {
        if (!item.render && item.editable) {
          item.render = (h, { row, index, column }) => {
            const keyArr = this.insideData[index] ? this.insideData[index].editingKeyArr : []
            return (
              <div>
                { keyArr && keyArr.indexOf(column.key) > -1 
                ? (
                  <i-input
                    value={row[column.key]}
                    on-input={this.handleInput.bind(this,row, index, column)}
                    style="width:30px;"
                  />
                ) : (
                  <span> {row[column.key]} </span>
                )}
                <i-button class="show-button"
                  on-click={this.handleClick.bind(this, { row, index, column })}
                >
                  { keyArr && keyArr.indexOf(column.key) > -1  ? "保存" : "编辑"}
                </i-button>
              </div>
            );
          };
          return item;
        }
        return item;
      });
      this.insideColumns = insideColumns;
    }
  },
  mounted() {
    this.handleColumns();
  },
  watch: {
    // 防止column改变没及时重新渲染
    columns() {
      this.handleColumns();
    },
    value() {
      this.handleColumns();
    }
  }
};
</script>
<style lang="less">
  .ivu-table-row{
    .show-button{
      display: none;
    }
  }
  .ivu-table-row:hover{
    .show-button{
      display: inline-block;
    }
  }
</style>
