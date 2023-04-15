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
      <el-table-column align="center" label="用户ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="个人简介">
        <template slot-scope="scope">
          {{ scope.row.bio }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
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
      @greet-event="getUserInfoList"
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
        normal: "success",
        draft: "gray",
        banned: "danger",
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
    this.getUserInfoList();
  },
  methods: {
    setCurrectPage(currentPage) {
      this.pagination.currentPage = currentPage;
    },
    banUser(index, row) {
      api
        .banUser(row.id)
        .then((response) => {
          // this.list[index].isBanned = 1;
          // this.list[index].status = "banned";
          // row.isBanned = 1;
          // row.status = "banned";
          // console.log(this.list[index].isBanned);
          // console.log(this.list[index].status);
          this.getUserInfoList();
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    cancelBanUser(index, row) {
      api
        .cancelBanUser(row.id)
        .then((response) => {
          // this.list[index].isBanned = 0;
          // this.list[index].status = "normal";
          // row.isBanned = 0;
          // row.status = "normal";
          // console.log(this.list[index].isBanned);
          // console.log(this.list[index].status);
          this.getUserInfoList();
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    getUserInfoList() {
      this.listLoading = true;
      api
        .getUserInfoList(this.pagination.currentPage, this.pagination.pageSize)
        .then((response) => {
          console.log(response.data);
          this.list = response.data.userManagementList;
          this.pagination.total = response.data.total;
          this.listLoading = false;
          for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (element.isBanned == 0) {
              element.status = "normal";
            } else {
              element.status = "banned";
            }
            if (element.gender == 0) {
              element.gender = "男";
            } else {
              element.gender = "女";
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
