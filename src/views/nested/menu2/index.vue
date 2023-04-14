<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          v-model="form.desc"
          type="textarea"
          :rows="30"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

