<template>
  <div class="dashboard-editor-container">
    <panel-group
      @handleSetLineChartData="handleSetLineChartData"
      :commentNum="commentNum"
      :visitNum="visitNum"
      :newUserNum="newUserNum"
      :userSignNum="userSignNum"
    />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col> -->
      <!-- <el-col :xs="24" :sm="24" :lg="8"> -->
      <el-col :span="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8"> -->
      <el-col :span="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <!-- 
    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        style="padding-right: 8px; margin-bottom: 30px"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import api from "@/api/request";

let lineChartData = {
  visitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  comments: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [],
    actualData: [],
  },
  shoppings: {
    expectedData: [],
    actualData: [],
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
  },
  data() {
    return {
      lineChartData: lineChartData.visitis,
      commentNum: 0,
      visitNum: 0,
      newUserNum: 0,
      userSignNum: 0,
    };
  },
  mounted() {
    this.getLastWeekCommentStatistics();
    this.getLastWeekUserStatistics();
    this.getLastWeekNewUserStatistics();
    this.getLastWeekUserSignStatistics();

    this.getLastWeekUserForecast();
    this.getLastWeekCommentForecast();
    this.getLastWeekUserSignForecast();

    this.getLastWeekNewUserForecast();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    getLastWeekCommentStatistics() {
      api
        .getLastWeekCommentStatistics()
        .then((response) => {
          console.log(response.data);
          lineChartData.comments.actualData = response.data;
          // 计算数组和
          this.commentNum = lineChartData.comments.actualData.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekUserStatistics() {
      api
        .getLastWeekUserStatistics()
        .then((response) => {
          console.log(response.data);
          lineChartData.visitis.actualData = response.data;
          // 计算数组和
          this.visitNum = lineChartData.visitis.actualData.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekNewUserStatistics() {
      api
        .getLastWeekNewUserStatistics()
        .then((response) => {
          console.log("test");
          lineChartData.purchases.actualData = response.data;
          // 计算数组和
          this.newUserNum = lineChartData.purchases.actualData.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekUserSignStatistics() {
      api
        .getLastWeekUserSignStatistics()
        .then((response) => {
          console.log("las");
          console.log(response.data);
          lineChartData.shoppings.actualData = response.data;
          // 计算数组和
          this.userSignNum = lineChartData.shoppings.actualData.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //预测
    getLastWeekUserForecast() {
      api
        .getLastWeekUserForecast()
        .then((response) => {
          console.log(response.data);
          lineChartData.visitis.expectedData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekCommentForecast() {
      api
        .getLastWeekCommentForecast()
        .then((response) => {
          lineChartData.comments.expectedData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekNewUserForecast() {
      api
        .getLastWeekNewUserForecast()
        .then((response) => {
          console.log("NewUser");

          console.log(response.data);
          lineChartData.purchases.expectedData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekUserSignForecast() {
      api
        .getLastWeekUserSignForecast()
        .then((response) => {
          console.log("UserSign");
          console.log(response.data);
          lineChartData.shoppings.expectedData = response.data;
        })
        .catch((error) => {
          console.log("UserSign");
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
