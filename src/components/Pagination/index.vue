<template>
  <div>
    <el-pagination
      background
      layout=" prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handlePagechange"
      :total="pagination.total"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
    />
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  // 处理每页显示条数变化
  methods: {
    handlePagechange(currentPage) {
      this.pagination.currentPage = currentPage; //传入参数变成当前页面 在调取查询操作
      console.log("this.pagination.currentPage:"+this.pagination.currentPage);
      console.log("currentPage:"+currentPage);
      // this.getpage();
      //调用父组件方法，重新查询分页信息
      this.$emit("setCurrectPage", currentPage);
      this.$emit("greet-event");
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
    },
  },
};
</script>
