// menu
$(".child1")
  .prev()
  .click(function() {
    $(this)
      .next()
      .slideToggle();
    if (
      $(this)
        .find(".hidebar_icon")
        .attr("src") != "../images/show2.png"
    ) {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/show2.png");
    } else {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/hide2.png");
    }
  });
$(".child2")
  .prev()
  .click(function() {
    $(this)
      .next()
      .slideToggle();
    if (
      $(this)
        .find(".hidebar_icon")
        .attr("src") != "../images/show2.png"
    ) {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/show2.png");
    } else {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/hide2.png");
    }
  });
$(".child3")
  .prev()
  .click(function() {
    $(this)
      .next()
      .slideToggle();
    if (
      $(this)
        .find(".hidebar_icon")
        .attr("src") != "../images/show2.png"
    ) {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/show2.png");
    } else {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/hide2.png");
    }
  });
// hover
var hover_arrow;
var hover_icon;
$(".hidebar_icon")
  .parent()
  .hover(
    function() {
      hover_arrow = $(this)
        .find(".hidebar_icon")
        .attr("src");
      hover_arrow = hover_arrow.substr(0, 14);
      hover_icon = $(this)
        .find(".scrollbarIcon")
        .attr("src");
      if (hover_icon != undefined) {
        hover_icon = hover_icon.replace(".png", "");
        $(this)
          .find(".scrollbarIcon")
          .attr("src", hover_icon + "2.png");
      }
      $(this).css("color", "red");
      $(this)
        .find(".hidebar_icon")
        .attr("src", hover_arrow + "2.png");
    },
    function() {
      hover_arrow = $(this)
        .find(".hidebar_icon")
        .attr("src");
      hover_arrow = hover_arrow.substr(0, 14);
      $(this).removeAttr("style");
      $(this)
        .find(".hidebar_icon")
        .attr("src", hover_arrow + ".png");

      if (hover_icon != undefined) {
        hover_icon = hover_icon.replace(".png", "");
        $(this)
          .find(".scrollbarIcon")
          .attr("src", hover_icon + ".png");
      }
    }
  );

// 切換醫師/全部醫師
// 打開
$(".chose_doc_total").click(function() {
  $(".chose_doc_option").toggleClass("d-nonei");
  $(".chose_doc_option2").toggleClass("d-nonei");
});
// 換文字，全部醫師
$(".chose_doc_option").click(function() {
  $(".chose_doc_total")
    .find("span")
    .text($(this).text());
  $(".chose_doc_option").addClass("d-nonei");
  $(".chose_doc_option2").addClass("d-nonei");
  // 版面變動
  $("#leaderboard_main")
    .parent()
    .removeClass("d-nonei");
  $("#dianJanRate")
    .parent()
    .removeClass("d-nonei");
  $("#PatientAddress_area").removeClass("d-nonei");
  $("#Item_Amount_area").removeAttr("style");
  Aj();
});
// AJ後失去dom，重跑,換文字醫師姓名部分
function choseDoc() {
  $(".chose_doc_option2>div").click(function() {
    $(".chose_doc_total")
      .find("span")
      .text($(this).text());
    $(".chose_doc_option").addClass("d-nonei");
    $(".chose_doc_option2").addClass("d-nonei");

    // 版面變動
    $("#leaderboard_main")
      .parent()
      .addClass("d-nonei");
    $("#dianJanRate")
      .parent()
      .addClass("d-nonei");
    $("#PatientAddress_area").addClass("d-nonei");
    $("#Item_Amount_area").css("width", "90%");
    Aj();
  });
}
// choseDoc();

// AJ的function
function Aj() {
  $.ajax({
    url: "https://www.google.com.tw/",
    type: "post",
    dataType: "json",
    async: false,
    data: $(".chose_doc_total")
      .find("span")
      .text(),
    success: function(e) {},
    error: function() {
      // ii/gg可能會改(自費)
      let aa = [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ];
      let bb = 0.4;
      let cc = [
        {
          name: "Forest",
          data: [320, 332, 301, 334, 390]
        },
        {
          name: "Steppe",
          data: [220, 182, 191, 234, 290]
        },
        {
          name: "Desert",
          data: [150, 232, 201, 154, 190]
        },
        {
          name: "Wetland",
          data: [98, 77, 101, 99, 40]
        }
      ];
      let dd = [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ];
      let ee = [
        { value: 335, name: "主治醫師" },
        { value: 1548, name: "兼職醫師" }
      ];
      let ff = {
        woman_num: 123, //女人人數
        man_num: 456, //男人人數
        woman_percent: 123, //女人%數
        man_percent: 123, //男人%數
        patient_woman_addOrless: 777, //女人較上月相比增加%
        patient_man_addOrless: -888 //男人較上月相比增加%
      };
      let gg = [987654, 741852, 658974, 547935, 388888, 546321]; //自費
      let hh = [20577, 60844, 65432, 98765, 444444, 25478];
      let ii = [500, 200, 300, 400, 500, 600]; //自費診次
      // let jj=[500, 200, 300, 400, 500, 600];
      let kk = [
        { name: "洗牙", value: 2335 },
        { name: "植牙", value: 1679 },
        { name: "拔牙", value: 679 },
        { name: "假牙", value: 379 },
        { name: "磨牙", value: 159 },
        { name: "其他", value: 2222 }
      ];
      let ll = [
        { name: "洗牙", value: 3835 },
        { name: "植牙", value: 7979 },
        { name: "拔牙", value: 879 },
        { name: "假牙", value: 367 },
        { name: "磨牙", value: 111 },
        { name: "其他", value: 3333 }
      ];
      let mm = [
        { name: "高雄市", value: 13835 },
        { name: "台北市", value: 335 },
        { name: "台中市", value: 235 },
        { name: "台南市", value: 135 },
        { name: "嘉義", value: 35 },
        { name: "南投", value: 25 },
        { name: "基隆", value: 15 },
        { name: "新竹", value: 5 },
        { name: "宜蘭", value: 2 },
        { name: "其他", value: 1 }
      ];
      let nn = [
        [
          "門診時間",
          "一早",
          "一午",
          "一晚",
          "二早",
          "二午",
          "二晚",
          "三早",
          "三午",
          "三晚",
          "四早",
          "四午",
          "四晚",
          "五早",
          "五午",
          "五晚",
          "六早",
          "六午",
          "六晚",
          "日早",
          "日午",
          "日晚"
        ],
        [
          "0-12歲",
          3,
          0,
          0,
          3,
          8,
          7,
          1,
          4,
          1,
          3,
          8,
          7,
          1,
          4,
          1,
          3,
          8,
          7,
          0,
          0,
          1
        ],
        [
          "13-29歲",
          10,
          0,
          8,
          1,
          4,
          1,
          5,
          1,
          7,
          1,
          4,
          1,
          5,
          1,
          7,
          1,
          4,
          1,
          0,
          0,
          7
        ],
        [
          "30-64歲",
          3,
          0,
          5,
          4,
          2,
          5,
          1,
          2,
          5,
          4,
          2,
          5,
          1,
          2,
          5,
          4,
          2,
          5,
          0,
          0,
          5
        ],
        [
          "65歲以上",
          7,
          0,
          2,
          4,
          9,
          1,
          2,
          1,
          2,
          4,
          9,
          1,
          2,
          1,
          2,
          4,
          9,
          1,
          0,
          0,
          2
        ]
      ];
      let oo = [
        [
          "門診時間",
          "一早",
          "一午",
          "一晚",
          "二早",
          "二午",
          "二晚",
          "三早",
          "三午",
          "三晚",
          "四早",
          "四午",
          "四晚",
          "五早",
          "五午",
          "五晚",
          "六早",
          "六午",
          "六晚",
          "日早",
          "日午",
          "日晚"
        ],
        [
          "掛號時段分布",
          3,
          0,
          0,
          3,
          8,
          7,
          1,
          4,
          1,
          3,
          8,
          7,
          1,
          4,
          1,
          3,
          8,
          7,
          0,
          0,
          1
        ]
      ];
      let pp = [
        [
          "門診時間",
          "一早",
          "一午",
          "一晚",
          "二早",
          "二午",
          "二晚",
          "三早",
          "三午",
          "三晚",
          "四早",
          "四午",
          "四晚",
          "五早",
          "五午",
          "五晚",
          "六早",
          "六午",
          "六晚",
          "日早",
          "日午",
          "日晚"
        ],
        [
          "預約時段率",
          7,
          0,
          2,
          4,
          9,
          1,
          2,
          1,
          2,
          4,
          9,
          1,
          2,
          1,
          2,
          4,
          9,
          1,
          0,
          0,
          2
        ]
      ];
      let qq = new Array();
      qq[0] = "a";
      qq[1] = "b";
      qq[2] = "c";
      if (
        $(".chose_doc_total")
          .find("span")
          .text() == "所有醫師"
      ) {
        // 初診點診率
        tsuJandianJanRate(aa);
        // 回診率
        ReturnVisitRate(bb);
        // 0.4
        // 排行榜
        leaderboard(cc);
        // 點診率
        dianJanRate(dd);
        // 主治/兼職醫師數
        docNum(ee);
        // 病患性別
        patient_sexual(ff);
        // 抓前月
        month_array_catch();
        // 總金額
        Total_Amount(gg, hh);
        // 診次數
        Consultation_Count(ii);
        // 單一診營業額
        Single_Turnover(ii);
        // 治療項目
        Item_Amount(kk, ll);
        // 病患地址
        PatientAddress(mm);
        // 統計分類
        TimeDistributed(nn, oo, pp);
      } else {
        // 回診率
        ReturnVisitRate(bb);
        // 0.4
        // 主治/兼職醫師數
        docNum(ee);
        // 病患性別
        patient_sexual(ff);
        // 抓前月
        month_array_catch();
        // 總金額
        Total_Amount(gg, hh);
        // 診次數
        Consultation_Count(ii);
        // 單一診營業額
        Single_Turnover(ii);
        // 治療項目
        Item_Amount(kk, ll);

        // 統計分類
        TimeDistributed(nn, oo, pp);
      }
      // 醫師名字
      for (let i = 0; i < qq.length; i++) {
        $(".chose_doc_option2").html(
          `
            <div>` +
            qq[i] +
            `</div>
            `
        );
      }
    }
  });
  choseDoc();
}

//
//
window.onload = function() {
  Aj();
};
