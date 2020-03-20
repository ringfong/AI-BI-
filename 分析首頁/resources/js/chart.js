
// 病患性別
function patient_sexual(e) {
  let patient_sexual_data = e;
  // {
  //   woman_num: 123, //女人人數
  //   man_num: 456,  //男人人數
  //   woman_percent: 123, //女人%數
  //   man_percent: 123,  //男人%數
  //   patient_woman_addOrless: 777,  //女人較上月相比增加%
  //   patient_man_addOrless: -888  //男人較上月相比增加%
  // };
  // 塞字
  $(".woman_num").text(patient_sexual_data.woman_num);
  $(".man_num").text(patient_sexual_data.man_num);
  $(".woman_percent").text(patient_sexual_data.woman_percent);
  $(".man_percent").text(patient_sexual_data.man_percent);
  $(".patient_woman_addOrless")
    .find("span")
    .eq(0)
    .text(patient_sexual_data.patient_woman_addOrless + "%");
  $(".patient_man_addOrless")
    .find("span")
    .eq(0)
    .text(patient_sexual_data.patient_man_addOrless + "%");
  // 顏色/圖片切換
  // 女
  if (patient_sexual_data.patient_woman_addOrless > 0) {
    $(".patient_woman_addOrless")
      .find("span")
      .eq(0)
      .css("color", "#539A08");
    $(".patient_woman_addOrless")
      .find("img")
      .attr("src", "../images/uparrow.png");
    $(".patient_woman_addOrless")
      .find("span")
      .eq(1)
      .text("多");
  } else {
    $(".patient_woman_addOrless")
      .find("span")
      .eq(0)
      .css("color", "#CD1D1D");
    $(".patient_woman_addOrless")
      .find("img")
      .attr("src", "../images/downarrow.png");
    $(".patient_woman_addOrless")
      .find("span")
      .eq(1)
      .text("少");
  }
  // 男
  if (patient_sexual_data.patient_man_addOrless > 0) {
    $(".patient_man_addOrless")
      .find("span")
      .eq(0)
      .css("color", "#539A08");
    $(".patient_man_addOrless")
      .find("img")
      .attr("src", "../images/uparrow.png");
    $(".patient_man_addOrless")
      .find("span")
      .eq(1)
      .text("多");
  } else {
    $(".patient_man_addOrless")
      .find("span")
      .eq(0)
      .css("color", "#CD1D1D");
    $(".patient_man_addOrless")
      .find("img")
      .attr("src", "../images/downarrow.png");
    $(".patient_man_addOrless")
      .find("span")
      .eq(1)
      .text("少");
  }
}
// 初診點診率
function tsuJandianJanRate(e) {
  var firstJandianJanRate_series;
  // // 給
  firstJandianJanRate_series = e;
  // e的格式
  // [
  //   { value: 335, name: "直接访问" },
  //   { value: 310, name: "邮件营销" },
  //   { value: 234, name: "联盟广告" },
  //   { value: 135, name: "视频广告" },
  //   { value: 1548, name: "搜索引擎" }
  // ];
  var firstJandianJanRate_legend = new Array();
  for (let i = 0; i < firstJandianJanRate_series.length; i++) {
    firstJandianJanRate_legend[i] = firstJandianJanRate_series[i].name;
  }
  // 宣告位置
  var firstJandianJanRate = echarts.init(
    document.getElementById("firstJandianJanRate")
  );
  //   細項調整
  firstJandianJanRate_option = {
    title: {
      text: ["{titleicon|} {titlefont|初診點診率}"],
      // subtext: '纯属虚构',
      textStyle: {
        rich: {
          titleicon: {
            backgroundColor: { image: "../images/titleIcon.png" },
            height: 24,
            width: 18
          },
          titlefont: {
            fontSize: "21px",
            color: " #6D7278"
          }
        }
      },
      left: "30",
      top: "25",
      icon: "../images/titleIcon.png"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: 30,
      top: "center",
      data: firstJandianJanRate_legend
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: firstJandianJanRate_series
      }
    ]
  };

  firstJandianJanRate.setOption(firstJandianJanRate_option);
}

// 回診率
function ReturnVisitRate(e) {
  let ReturnVisitRateChart = echarts.init(
    document.getElementById("ReturnVisitRate")
  );
  let ReturnVisitRate_ChartData = [];
  let ReturnVisitRateData = e;
  // e的格式0.4
  ReturnVisitRate_ChartData.push(ReturnVisitRateData);
  ReturnVisitRate_ChartData.push(ReturnVisitRateData);
  ReturnVisitRate_ChartData.push(ReturnVisitRateData);
  ReturnVisitRate_ChartData.push(ReturnVisitRateData);
  ReturnVisitRate_ChartData.push(ReturnVisitRateData);
  let option = {
    // backgroundColor: "#FFFFFF",
    title: {
      text: ["{titleicon|} {titlefont|回診率}"],
      // subtext: '纯属虚构',
      textStyle: {
        rich: {
          titleicon: {
            backgroundColor: { image: "../images/titleIcon.png" },
            height: 24,
            width: 18
          },
          titlefont: {
            fontSize: "21px",
            color: " #6D7278"
          }
        }
      },
      left: "30",
      top: "25",
      icon: "../images/titleIcon.png"
    },
    series: [
      {
        type: "liquidFill",
        radius: "80%",
        data: ReturnVisitRate_ChartData,
        backgroundStyle: {
          borderWidth: 5,
          borderColor: "rgb(255,0,255,0.9)",
          color: "rgb(255,0,255,0.01)"
        },
        label: {
          normal: {
            formatter: (ReturnVisitRateData * 100).toFixed(2) + "%",
            textStyle: {
              fontSize: 50
            }
          }
        }
      }
    ]
  };
  ReturnVisitRateChart.setOption(option);
}

// 排行榜
function leaderboard(e) {
  var leaderboard_data_series;
  var leaderboard_data_legend = new Array();
  //   以下是傳給我的資料格式
  //   給
  leaderboard_data_series = e;
  // e得格式
  // [
  //   {
  //     name: "Forest",
  //     data: [320, 332, 301, 334, 390]
  //   },
  //   {
  //     name: "Steppe",
  //     data: [220, 182, 191, 234, 290]
  //   },
  //   {
  //     name: "Desert",
  //     data: [150, 232, 201, 154, 190]
  //   },
  //   {
  //     name: "Wetland",
  //     data: [98, 77, 101, 99, 40]
  //   }
  // ];
  //   至此

  for (let i = 0; i < leaderboard_data_series.length; i++) {
    // 添加bar
    leaderboard_data_series[i].type = "bar";
    //   工具列有哪些
    leaderboard_data_legend[i] = leaderboard_data_series[i].name;
  }

  //  宣告
  var leaderboard_main = echarts.init(
    document.getElementById("leaderboard_main")
  );
  leaderboard_option = {
    title: {
      text: ["{titleicon|} {titlefont|排行榜}"],
      // subtext: '纯属虚构',
      textStyle: {
        rich: {
          titleicon: {
            backgroundColor: { image: "../images/titleIcon.png" },
            height: 24,
            width: 18
          },
          titlefont: {
            fontSize: "21px",
            color: " #6D7278"
          }
        }
      },
      left: "30",
      top: "25",
      icon: "../images/titleIcon.png"
    },
    // color: [
    //   "#2AC0B1",
    //   "#9657FF",
    //   "#2B51ED",
    //   "#FCC118",
    //   "#F5DDE3",
    //   "#D3A99F",
    //   "#A32E9A",
    //   "#C16954",
    //   "#471D13",
    //   "#464713",
    //   "#592EA3",
    //   "#1E11E7",
    //   "#11A3E7",
    //   "#8C9295",
    //   "#18B283",
    //   "#57A262",
    //   "#A2AB1A",
    //   "#04F512",
    //   "#CE1F2F",
    //   "#9D7FB0"
    // ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: leaderboard_data_legend,
      left: "center",
      top: 30
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "center",
      top: "bottom",
      feature: {
        mark: { show: false },
        dataView: { show: false, readOnly: false },
        magicType: { show: false, type: ["line", "bar", "stack", "tiled"] },
        restore: { show: false },
        saveAsImage: { show: false }
      }
    },
    yAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: ["本月", "本季"]
      }
    ],
    xAxis: [
      {
        type: "value"
      }
    ],
    series: leaderboard_data_series
  };

  // 使用刚指定的配置项和数据显示图表。
  leaderboard_main.setOption(leaderboard_option);
}

//   點診率
function dianJanRate(e) {
  var dianJanRate_data_series;
  // 給
  dianJanRate_data_series = e;
  // e的格式
  // [
  //   { value: 335, name: "直接访问" },
  //   { value: 310, name: "邮件营销" },
  //   { value: 234, name: "联盟广告" },
  //   { value: 135, name: "视频广告" },
  //   { value: 1548, name: "搜索引擎" }
  // ];
  var dianJanRate_data_legend = new Array();
  for (let i = 0; i < dianJanRate_data_series.length; i++) {
    dianJanRate_data_legend[i] = dianJanRate_data_series[i].name;
  }
  // 宣告位置
  var dianJanRate = echarts.init(document.getElementById("dianJanRate"));

  dianJanRate_option = {
    title: {
      text: ["{titleicon|} {titlefont|點診率}"],
      // subtext: '纯属虚构',
      textStyle: {
        rich: {
          titleicon: {
            backgroundColor: { image: "../images/titleIcon.png" },
            height: 24,
            width: 18
          },
          titlefont: {
            fontSize: "21px",
            color: " #6D7278"
          }
        }
      },
      left: "30",
      top: "25",
      icon: "../images/titleIcon.png"
    },
    // color: [
    //   "#2AC0B1",
    //   "#9657FF",
    //   "#2B51ED",
    //   "#FCC118",
    //   "#F5DDE3",
    //   "#D3A99F",
    //   "#A32E9A",
    //   "#C16954",
    //   "#471D13",
    //   "#464713",
    //   "#592EA3",
    //   "#1E11E7",
    //   "#11A3E7",
    //   "#8C9295",
    //   "#18B283",
    //   "#57A262",
    //   "#A2AB1A",
    //   "#04F512",
    //   "#CE1F2F",
    //   "#9D7FB0"
    // ],
    tooltip: {
      //hover 提醒
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "30",
      top: "center",
      data: dianJanRate_data_legend
    },
    series: [
      {
        name: "點診率",
        type: "pie",
        radius: "50%",
        // center: ["50%", "50%"],
        center: "50%",
        top: "-15%",
        height: "130%",
        data: dianJanRate_data_series,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
  dianJanRate.setOption(dianJanRate_option);
}

// 主治/兼職醫師數

function docNum(e) {
  var docNum_series;
  // 給
  docNum_series = e;
  // e的格式
  // [
  //   { value: 335, name: "主治醫師" },
  //   { value: 1548, name: "兼職醫師" }
  // ];
  var docNum_legend = new Array();
  for (let i = 0; i < docNum_series.length; i++) {
    docNum_legend[i] = docNum_series[i].name;
  }
  // 宣告位置
  var docNum = echarts.init(document.getElementById("docNum"));

  docNum_option = {
    title: {
      text: ["{titleicon|} {titlefont|主治/兼職醫師數}"],
      // subtext: '纯属虚构',
      textStyle: {
        rich: {
          titleicon: {
            backgroundColor: { image: "../images/titleIcon.png" },
            height: 24,
            width: 18
          },
          titlefont: {
            fontSize: "21px",
            color: " #6D7278"
          }
        }
      },
      left: "30",
      top: "25",
      icon: "../images/titleIcon.png"
    },
    // color: ["#2AC0B1", "#FCC118"],
    tooltip: {
      //hover 提醒
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "30",
      top: "100px",
      data: docNum_legend
    },
    series: [
      {
        name: "主治/兼職醫師數",
        type: "pie",
        radius: "50%",
        // center: ["50%", "50%"],
        left: "-5%",
        top: "-10%",
        height: "150%",
        data: docNum_series,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
  docNum.setOption(docNum_option);
}
