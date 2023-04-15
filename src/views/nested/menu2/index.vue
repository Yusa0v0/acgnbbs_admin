<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="30"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNotice">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/request";
export default {
  data() {
    return {
      form: {
        id: 0,
        createdAdminName: "admin",
        title: "",
        content: "",
      },
    };
  },
  created() {
    if (this.$route.params.id != ":id") {
      this.form.id = this.$route.params.id;
    }
    if (this.$route.params.title != ":title") {
      this.form.title = this.$route.params.title;
    }
    if (this.$route.params.content != ":content") {
      this.form.content = this.$route.params.content;
    }
    this.noticeList();
  },
  methods: {
    addNotice() {
      console.log(typeof this.form.id);
      console.log(this.form.createdAdminName);
      console.log(this.form.title);
      console.log(this.form.content);

      api
        .aNotice(
          // this.form.id,
          // this.form.createdAdminName,
          // this.form.title,
          // this.form.content
          0,
          "admin",
          "金",
          "内容"
        )
        .then((response) => {
          console.log(response);
          this.$message.success("发布成功");
          this.form.id = 0;
          this.form.createdAdminName = "";
          this.form.title = "";
          this.form.content = "";
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    noticeList() {
      api
        .noticeList()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

