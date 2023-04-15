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
      <el-table-column
        align="center"
        prop="created_at"
        label="上次登录时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="145" align="center">
        <template slot-scope="scope">
          <div class="operation">
            <el-button size="mini" @click="banUser(scope.$index, scope.row)"
              >封禁</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="banUser(scope.$index, scope.row)"
              >封禁</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/request";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        draft: "gray",
        banned: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  created() {
    this.getUserInfoList();
  },
  methods: {
    banUser() {},
    getUserInfoList() {
      this.listLoading = true;
      api
        .getUserInfoList(1, 10)
        .then((response) => {
          console.log(response.data);
          this.list = response.data.userInfoVOList;
          this.listLoading = false;
          for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (element.isBanned == 0) {
              element.status = "success";
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
