<template>
  <Table :columns="insideColumns" :data="value"></Table>
</template>
<script>
import clonedeep from "clonedeep";
export default {
  name: "EditTable",
  data() {
    return {
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
      // 保存操作
      if (this.editingId === `${column.key}_${index}`) {
        let tableData = clonedeep(this.value);
        tableData[index][column.key] = this.editingContent;
        this.$emit("input", tableData)
        this.$emit("on-edit", {
          row,
          index,
          column,
          newVal: this.editingContent
        });
        this.editingId = "";
        this.editingContent = "";
      } else {
        this.editingId = `${column.key}_${index}`
      }
    },
    handleInput(newVal) {
      this.editingContent = newVal
    },
    handleColumns() {
      // 不能直接修改父组件传过来的值
      const insideColumns = this.columns.map(item => {
        if (!item.render && item.editable) {
          item.render = (h, { row, index, column }) => {
            // console.log(row,index,column)
            const isEditing = this.editingId === `${column.key}_${index}`;
            return (
              <div>
                {isEditing ? (
                  <i-input
                    value={row[column.key]}
                    on-input={this.handleInput}
                    style="width:30px;"
                  />
                ) : (
                  <span> {row[column.key]} </span>
                )}
                <i-button
                  on-click={this.handleClick.bind(this, { row, index, column })}
                >
                  {isEditing ? "保存" : "编辑"}
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
    }
  }
};
</script>
