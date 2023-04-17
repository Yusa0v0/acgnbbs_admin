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
      <el-table-column align="center" label="帖子ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.postId }}
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="举报内容">
        <template slot-scope="scope">
          {{ scope.row.reportContent }}
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="145" align="center">
        <template slot-scope="scope">
          <div class="operation">
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.isBanned"
              @click="banUser(scope.$index, scope.row)"
              >封禁</el-button
            >
            <el-button
              size="mini"
              :disabled="!scope.row.isBanned"
              @click="cancelBanUser(scope.$index, scope.row)"
              >解封</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pagination="pagination"
      @greet-event="getReportList"
      :setCurrectPage="setCurrectPage"
    />
  </div>
</template>

<script>
import api from "@/api/request";
import Pagination from "@/components/Pagination";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        isHanlded: "success",
        draft: "gray",
        notHanlded: "danger",
      };
      return statusMap[status];
    },
  },
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
    this.getReportList();
  },
  methods: {
    setCurrectPage(currentPage) {
      this.pagination.currentPage = currentPage;
    },
    banUser(index, row) {
      api
        .banUser(row.id)
        .then((response) => {
          this.getReportList();
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    cancelBanUser(index, row) {
      api
        .cancelBanUser(row.id)
        .then((response) => {
          this.getReportList();
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    getReportList() {
      this.listLoading = true;
      api
        .getReportList(this.pagination.currentPage, this.pagination.pageSize)
        .then((response) => {
          console.log(response.data);
          this.list = response.data.reportList;
          this.pagination.total = response.data.total;
          this.listLoading = false;
          for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (element.isHandled == 0) {
              element.status = "notHanlded";
            } else {
              element.status = "isHanlded";
            }
          }
          console.log(this.list);
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
          this.listLoading = false;
        });
    },
  },
};
</script>
