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
      <el-table-column label="被举报用户ID" width="110" align="center">
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
            <span v-if="scope.row.status == 'isHandled'"> 已处理 </span>
            <span v-else> 待处理 </span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="145" align="center">
        <template slot-scope="scope">
          <div class="operation">
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.isHandled == 0"
              @click="handleReport(scope.$index, scope.row)"
              >处理举报</el-button
            >
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.isHandled == 1"
              @click="getReportResult(scope.$index, scope.row)"
              >查看举报结果</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="处理举报" width="40%" :visible.sync="showReportDialog">
      <el-form ref="reportForm" label-width="80px">
        <el-form-item label="用户信息" prop="userInfo">
          <span class="user-info-userLine">
            <el-avatar :src="userInfo.avatar"></el-avatar>
            <el-divider direction="vertical"></el-divider>
            {{ userInfo.username }}
            <span v-if="this.userInfo.gender">
              <i class="el-icon-female" style="color: #ff69b4"></i>
            </span>
            <span v-else>
              <i class="el-icon-male" style="color: #00bfff"></i>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span>
              <el-tag type="danger">封号中</el-tag>
            </span>
          </span>
        </el-form-item>
        <el-form-item label="帖子标题" prop="postInfo">
          <div v-html="post.title"></div>
        </el-form-item>
        <el-form-item label="帖子信息" prop="postInfo">
          <div class="report-post-info" v-html="post.content"></div>
        </el-form-item>
        <el-form-item label="举报信息" prop="postInfo">
          <span> {{ list[reportIndex].reportContent }} </span>
        </el-form-item>

        <el-form-item label="操作" v-if="list[reportIndex].isHandled == 0">
          <el-button
            type="danger"
            @click="banUser(list[reportIndex].userId)"
            :disabled="list[reportIndex].userBanned"
          >
            封禁用户
          </el-button>
          <el-button
            type="danger"
            @click="deletePostByAdmin(list[reportIndex].postId)"
            :disabled="list[reportIndex].postDeleted"
          >
            删除帖子
          </el-button>
          <el-button
            type="primary"
            @click="finishReport(list[reportIndex].id)"
            :disabled="list[reportIndex].isHandled == 1"
          >
            完成举报
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        isHandled: "success",
        draft: "gray",
        notHandled: "danger",
      };
      return statusMap[status];
    },
  },
  components: {
    Pagination,
  },
  data() {
    return {
      reportIndex: 0,
      showReportDialog: false,
      post: {
        title: "",
        content: "",
      },
      userInfo: {
        id: 1,
        username: "",
        bio: "",
        gender: 0,
        avatar: "",
      },
      list: null,
      listLoading: true,
      reportForm: {
        reportContent: "",
      },
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
    handleReport(index, row) {
      this.reportIndex = index;
      this.postDetails(row.postId);
      this.getUserInfo(row.userId);
      this.showReportDialog = true;
    },
    getReportResult(index, row) {
      this.reportIndex = index;
      this.post.title = "<h3>该帖已被删除</h3>";
      this.post.content = "<h3>该帖已被删除</h3>";
      this.getUserInfo(row.userId);
      this.showReportDialog = true;
    },
    finishReport(id) {
      api
        .handleReport(id)
        .then((response) => {
          this.list[this.reportIndex].isHandled = 1;
          this.$message.success("处理举报成功");
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    banUser(id) {
      this.list[this.reportIndex].userBanned = true;
      api
        .banUser(id)
        .then((response) => {})
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    deletePostByAdmin(id) {
      this.list[this.reportIndex].postDeleted = true;
      api
        .deletePostByAdmin(id)
        .then((response) => {})
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
              element.status = "notHandled";
            } else {
              element.status = "isHandled";
            }
          }
          console.log(this.list);
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
          this.listLoading = false;
        });
    },
    postDetails(id) {
      api
        .postDetails(id)
        .then((res) => {
          this.post = res.data;
        })
        .catch((error) => {
          console.log("" + error);
        });
    },
    getUserInfo(id) {
      api
        .getUserInfo(id)
        .then((response) => {
          this.userInfo = response.data;
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
  },
};
</script>
<style scoped>
.user-info-userLine {
  display: flex;
  align-items: center;
}
.report-post-info >>> img {
  /* width: 100% !important; */
  max-width: 300px;
  max-height: 400px;
}
</style>
