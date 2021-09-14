<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <div id="main" :style="{ width: '600px', height: '400px' }"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '影响流量的一些因素'
            },
            tooltip: {},
            legend: {
                data:['内容']
            },
            xAxis: {
                data: ["课程","老师","学校","内容","新鲜度","自身因素"]
            },
            yAxis: {},
            series: [{
                name: '比例',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>