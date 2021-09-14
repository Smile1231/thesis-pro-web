<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <div class="graph">
        <div id="main" :style="{ width: '600px', height: '400px' }"></div>
        <div id="main1" :style="{ width: '600px', height: '400px' }"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  mounted() {
    var app = {};
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    var option1;

    option1 = {
      title: {
        text: "观看占比",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["直接访问", "朋友推荐", "名师效应", "自身需求", "网站推广"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "朋友推荐" },
            { value: 234, name: "名师效应" },
            { value: 135, name: "自身需求" },
            { value: 1548, name: "网站推广" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    app.currentIndex = -1;

    setInterval(function () {
      var dataLen = option1.series[0].data.length;
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: app.currentIndex,
      });
      app.currentIndex = (app.currentIndex + 1) % dataLen;
      // 高亮当前图形
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: app.currentIndex,
      });
      // 显示 tooltip
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: app.currentIndex,
      });
    }, 1000);

    option1 && myChart.setOption(option1);

    var chartDom = document.getElementById("main1");
    var myChart1 = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: "浏览器占比变化",
        subtext: "*",
        top: 10,
        left: 10,
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        type: "scroll",
        bottom: 10,
        data: (function () {
          var list = [];
          for (var i = 1; i <= 28; i++) {
            list.push(i + 2000 + "");
          }
          return list;
        })(),
      },
      visualMap: {
        top: "middle",
        right: 10,
        color: ["red", "yellow"],
        calculable: true,
      },
      radar: {
        indicator: [
          { text: "IE8-", max: 400 },
          { text: "IE9+", max: 400 },
          { text: "Safari", max: 400 },
          { text: "Firefox", max: 400 },
          { text: "Chrome", max: 400 },
        ],
      },
      series: (function () {
        var series = [];
        for (var i = 1; i <= 28; i++) {
          series.push({
            name: "浏览器（数据纯属虚构）",
            type: "radar",
            symbol: "none",
            lineStyle: {
              width: 1,
            },
            emphasis: {
              areaStyle: {
                color: "rgba(0,250,0,0.3)",
              },
            },
            data: [
              {
                value: [
                  (40 - i) * 10,
                  (38 - i) * 4 + 60,
                  i * 5 + 10,
                  i * 9,
                  (i * i) / 2,
                ],
                name: i + 2000 + "",
              },
            ],
          });
        }
        return series;
      })(),
    };

    option && myChart1.setOption(option);
  },
};
</script>

<style lang="less">
.graph{
    display: flex;

}
</style>