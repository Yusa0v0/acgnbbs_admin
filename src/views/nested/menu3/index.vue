<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="公告ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAdminName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="发布时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="145" align="center">
        <template slot-scope="scope">
          <div class="operation">
            <el-button size="mini" @click="editNotice(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteNotice(scope.$index, scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pagination="pagination"
      @greet-event="noticeList"
      :setCurrectPage="setCurrectPage"
    />
  </div>
</template>

<script>
import api from "@/api/request";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      list: null,
      listLoading: true,
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  created() {
    this.noticeList();
  },
  methods: {
    setCurrectPage(currentPage) {
      this.pagination.currentPage = currentPage;
    },
    editNotice(index, row) {
      console.log(row.title);
      this.$router.push(`/nested/menu2/${row.id}/${row.title}/${row.title}`);
    },
    deleteNotice(index, row) {
      api
        .deleteNotice(row.id)
        .then((response) => {
          this.$message.success("删除成功");
          this.list.splice(index, 1);
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    noticeList() {
      this.listLoading = true;
      api
        .noticeList(this.pagination.currentPage, this.pagination.pageSize)
        .then((response) => {
          console.log(response.data);
          this.list = response.data.userInfoList;
          this.pagination.total = response.data.total;
          this.listLoading = false;
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
          this.listLoading = false;
        });
    },
  },
};
</script>
<style scoped>
.operation {
  display: flex;
  flex-direction: row;
}
</style>
