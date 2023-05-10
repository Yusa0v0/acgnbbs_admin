<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import api from "@/api/request";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
      animationData: [100, 100, 100, 100, 100, 100, 100],
      comicData: [100, 100, 100, 100, 100, 100, 100],
      gameData: [100, 100, 100, 100, 100, 100, 100],
      novelData: [100, 100, 100, 100, 100, 100, 100],
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log("Bar");
      this.getLastWeekAnimationPageViewStatistics();
      this.getLastWeekComicPageViewStatistics();
      this.getLastWeekGamenPageViewStatistics();
      this.getLastWeekNovelPageViewStatistics();
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "动漫",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.animationData,
            animationDuration,
          },
          {
            name: "漫画",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.comicData,
            animationDuration,
          },
          {
            name: "游戏",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.gameData,
            animationDuration,
          },
          {
            name: "小说",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.novelData,
            animationDuration,
          },
        ],
      });
    },
    getLastWeekAnimationPageViewStatistics() {
      api
        .getLastWeekAnimationPageViewStatistics()
        .then((response) => {
          this.animationData = response.data;
          this.initChart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekComicPageViewStatistics() {
      api
        .getLastWeekComicPageViewStatistics()
        .then((response) => {
          this.comicData = response.data;
          this.initChart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekGamenPageViewStatistics() {
      api
        .getLastWeekGamePageViewStatistics()
        .then((response) => {
          this.gameData = response.data;
          this.initChart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLastWeekNovelPageViewStatistics() {
      api
        .getLastWeekNovelPageViewStatistics()
        .then((response) => {
          console.log("PageView");
          this.novelData = response.data;
          this.initChart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
