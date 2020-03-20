// 假資料

// 醫生與診所資料
var DoctorName = ["宇禾牙醫診所", "A醫生-A000000000", "B醫生-B111111111", "C醫生-C222222222", "D醫生-D3333333333"]
// 假健保
var HisAmount = [600000, 800000, 900000, 1000000, 200000, 700000, 650000, 800000, 900000, 1000000, 1100000, 1200000]
// 假資料(月[細項(從"自費金額"開始共38項)......])
var AJData = [[800000, 1400000, 100, 14000, 1,0,1,0,1,0,2,0,3,4,1,1,2,6,1,2,10,15,4,15,3,10,15,2,9,10,8,3,1,5,0,0,0,0],
              [600000, 1300000, 50, 65000, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
            ];



// ======================================
//全域變數
// 今日時間宣告
var today=new Date();
// AJ傳送變數
var AJCondition = ["total", (today.getFullYear() - 1911)];

// Echarts 繪圖
var Average_Price_StatisticsChart = echarts.init(document.getElementById('Average_Price_Statistics'));
var TOP10_OwnExpenseChart = echarts.init(document.getElementById('TOP10_OwnExpense'));

//=======================================

// 按鍵控制
$(document).ready(function(){
    // 資料請求填入
    InformationInsert();
    $("input").attr("readonly", "readonly");
    // 診所醫生切換
    $("#SelfFilling_class_button_area").on("click", ".SelfFilling_button",function() {
        if ($(this).attr("id") == "SelfFilling_clinic") {
            $("#SelfFilling_clinic").addClass("clinic_button_down");
            $("#SelfFilling_clinic").removeClass("clinic_button_up");
            $("#SelfFilling_class_button_area .class_button_down").removeClass("class_button_down");
            $("#SelfFilling_class_button_area .SelfFilling_button[id!='SelfFilling_clinic']").addClass("class_button_up");
            $("input").attr("readonly","readonly");
            //$('td input').addClass('gray');
            AJCondition[0] = "total";
        }else{
            $("#SelfFilling_clinic").removeClass("clinic_button_down");
            $("#SelfFilling_clinic").addClass("clinic_button_up");
            $("#SelfFilling_class_button_area .class_button_down").removeClass("class_button_down");
            $("#SelfFilling_class_button_area .SelfFilling_button[id!='SelfFilling_clinic']").addClass("class_button_up");
            $(this).addClass("class_button_down");
            $(this).removeClass("class_button_up");
            $("input").removeAttr("readonly");
            //$('td input').removeClass('gray');
            AJCondition[0] = $(this).children().val();
        }
    });
    // 年度切換
    $("#SelfFilling_statistics_button_area").on("click", ".SelfFilling_button",function() {
        $("#SelfFilling_statistics_button_area .statistics_button_down").removeClass("statistics_button_down");
        $("#SelfFilling_statistics_button_area .SelfFilling_button").addClass("statistics_button_up");
        $(this).addClass("statistics_button_down");
        $(this).removeClass("statistics_button_up");
        let ROCyear = $(this).text().slice(0, 3);
        AJCondition[1] = ROCyear;
        ROCYearChange();
    });
    // input失焦動態抓取並更新
    $("input").blur(function(){
        // 監控input第一個字不可為0，自動修正
        let value = $(this).val();
        value = value.replace(/^0*/g,''); 
        $(this).val(value); 
        // 取得目前定位
        let tdSeq = $(this).parent().index();
        let trSeq = $(this).parent().parent().index();        
        // 自費定位
        let own_expense_aims = "#SelfFilling_table1 tbody tr:nth-child(2) td:nth-child(" + (tdSeq+1) + ") input";
        let own_expense = $(own_expense_aims).val();
        let totalprice;
        if (own_expense == "") {
            totalprice = HisAmount[(tdSeq-1)]
        } else {
            totalprice = HisAmount[(tdSeq-1)] + parseInt(own_expense);
        }
        // 加總金額定位並填入
        let totalprice_aims = "#SelfFilling_table1 tbody tr:nth-child(3) td:nth-child(" + (tdSeq+1) + ")";
        $(totalprice_aims).text(totalprice);
        // 若存在看診次數則計算平均單價
        let ConsultationCount_aims = "#SelfFilling_table1 tbody tr:nth-child(4) td:nth-child(" + (tdSeq+1) + ") input"
        let ConsultationCount = $(ConsultationCount_aims).val();
        if (ConsultationCount != "") {
            Average_expense = Math.floor((totalprice/ConsultationCount) * 100) / 100;
            let Average_expense_aims = "#SelfFilling_table1 tbody tr:nth-child(5) td:nth-child(" + (tdSeq+1) + ")"
            $(Average_expense_aims).text(Average_expense);
        } 
    });
    $("#SelfFilling_table2 input").keydown(function () {
        if (event.keyCode == 13 | event.keyCode == 40) {            
            let tdSeq = $(this).parent().index();
            let trSeq = $(this).parent().parent().index();
            let Aims = "#SelfFilling_table2 tbody tr:nth-child(" + (trSeq + 2) + ") td:nth-child(" + (tdSeq + 1) + ") input";
            if ($(Aims).length == 0) {
                Aims = "#SelfFilling_table2 tbody tr:nth-child(" + (trSeq + 3) + ") td:nth-child(" + (tdSeq + 1) + ") input";
            }
            $(Aims).focus();
        } else if (event.keyCode == 38) {
            let tdSeq = $(this).parent().index();
            let trSeq = $(this).parent().parent().index();
            let Aims = "#SelfFilling_table2 tbody tr:nth-child(" + (trSeq) + ") td:nth-child(" + (tdSeq + 1) + ") input";
            if ($(Aims).length == 0) {
                Aims = "#SelfFilling_table2 tbody tr:nth-child(" + (trSeq - 1) + ") td:nth-child(" + (tdSeq + 1) + ") input";
            }
            $(Aims).focus();
        } else if (event.keyCode == 39) {            
            let tdSeq = $(this).parent().index();
            let trSeq = $(this).parent().parent().index();
            let Aims = "#SelfFilling_table2 tbody tr:nth-child(" + (trSeq + 1) + ") td:nth-child(" + (tdSeq + 2) + ") input";
            $(Aims).focus();
        } else if (event.keyCode == 37) {           
            let tdSeq = $(this).parent().index();
            let trSeq = $(this).parent().parent().index();
            let Aims = "#SelfFilling_table2 tbody tr:nth-child(" + (trSeq + 1) + ") td:nth-child(" + (tdSeq) + ") input";
            $(Aims).focus();
        };
    });
    // 點選更多展開表格二區
    $("#SaveButton_More").click(function(){
        $("#SelfFilling_table2").css("display", "table");
        $(this).css("display", "none");
    });
    // 表格2區input按Enter切換到下方一格
    $("#SelfFilling_table2 input").keydown(function(){
        if (event.keyCode == 13) {  
            // 取得目前定位
            let tdSeq = $(this).parent().index();
            let trSeq = $(this).parent().parent().index();
            let Aims = "#SelfFilling_table2 tbody tr:nth-child(" + (trSeq+2) + ") td:nth-child(" + (tdSeq+1) + ") input";
            console.log($(Aims));
            if ($(Aims).length == 0) {
                Aims = "#SelfFilling_table2 tbody tr:nth-child(" + (trSeq+3) + ") td:nth-child(" + (tdSeq+1) + ") input";
            }
            $(Aims).focus();
        };
    });
    // 儲存按鈕按下去
    $("#SaveButton_Save").click(function(){
        $("#EchartsView").css("display", "flex");
        // 資料存起來
        SaveAllData();
        // 畫圖發大......
        AveragePriceStatistics();
        TOP10OwnExpense();
    });
});


// 接收資料創造按鍵與填入表格
function InformationInsert(){
    // 自費金額分類按鍵
    let buttonhtml = '<div id="SelfFilling_clinic" class="SelfFilling_button clinic_button_down">' + 
    DoctorName[0] + '</div>'
    for (let i = 1; i < DoctorName.length; i++) {
        let Doctor = DoctorName[i].split("-");
        let appendtohtml = '<div class="SelfFilling_button class_button_up">' + 
        Doctor[0] + '<input type="text" class="hide_on_bush" value="' + 
        Doctor[1] + '"></div>';
        buttonhtml += appendtohtml;
    };
    document.getElementById("SelfFilling_class_button_area").innerHTML = buttonhtml;
    // 自費項目統計年份
    let yearhtml = '<div id="SelfFilling_statistics_text">年度分類:</div><div class="SelfFilling_button statistics_button_up">' +
    (today.getFullYear() - 1913) + '年度</div><div class="SelfFilling_button statistics_button_up">' +
    (today.getFullYear() - 1912) + '年度</div><div class="SelfFilling_button statistics_button_down">' +
    (today.getFullYear() - 1911) + '年度</div>'
    document.getElementById("SelfFilling_statistics_button_area").innerHTML = yearhtml;
    // 年度/項目填入
    ROCYearChange();
    // 填入健保金額
    HISAmountChange();
    // 填入自費金額與項目
    OwnExpenseDatafromDB();
    // 初次計算家總金額
    TotalPriceCountFirst();
}

// 年度/項目變更
function ROCYearChange() {
    let pickyear = document.getElementsByClassName("statistics_button_down")[0];
    let ROCyear = pickyear.innerText.slice(0, 3);
    let thhtml = '<th>年度/項目</th>'
    for (let i = 1; i < 13; i++) {
        let thmonth;
        if (i < 10) {
            thmonth = '<th>'+ ROCyear +'/0'+ i +'</th>'
        }else{
            thmonth = '<th>'+ ROCyear +'/'+ i +'</th>'
        };
        thhtml += thmonth;
    };
    document.getElementById("ROCyearandmonth").innerHTML = thhtml;
}


// 健保金額填入
function HISAmountChange() {
    let HISAmounthtml='<td style="background-color: #B8EBFF;">健保金額</td>';
    for (let i = 0; i < 12; i++) {
        HISAmounthtml += '<td>'+ HisAmount[i] +'</td>'
    }
    document.getElementById("HISAmount").innerHTML = HISAmounthtml;
}

// 初次計算加總
function TotalPriceCountFirst() {
    for (let i = 2; i < 14; i++) {
        // 定位自費
        let own_expense_aims = "#SelfFilling_table1 tbody tr:nth-child(2) td:nth-child(" + i + ") input";
        let own_expense = $(own_expense_aims).val();
        let totalprice;
        if (own_expense == "") {
            totalprice = HisAmount[(i-2)]
        } else {
            totalprice = HisAmount[(i-2)] + parseInt(own_expense);
        }
        // 定位加總
        let TotalPrice_aims = "#SelfFilling_table1 tbody tr:nth-child(3) td:nth-child(" + i + ")";
        $(TotalPrice_aims).text(totalprice);
    }
}

// 填入資料庫請求的自費金額與項目
function OwnExpenseDatafromDB() {
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 38; j++) {
            let item = AJData[i][j];
            let Aims;
            if (j == 1 | j == 3) {
                Aims = "#SelfFilling_table1 tbody tr:nth-child(" + (j+2) + ") td:nth-child(" + (i+2) + ")";
                $(Aims).text(item);
            }
            else{
                Aims = "#project" + j + " td:nth-child(" + (i+2) + ") input";
                $(Aims).val(item);
            }
        }
    }
}

// 儲存表格內容
function SaveAllData() {
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 38; j++) {
            let Aims;
            if (j == 1 | j == 3) {
                Aims = "#SelfFilling_table1 tbody tr:nth-child(" + (j+2) + ") td:nth-child(" + (i+2) + ")";
                AJData[i][j] = $(Aims).text();
            }
            else{
                Aims = "#project" + j + " td:nth-child(" + (i+2) + ") input";
                AJData[i][j] = $(Aims).val();
            }
        }
    }
}

// 平均單價金額統計圖
function AveragePriceStatistics() {
    let AveragePriceData = [];
    // 提取檔案中平均單價金額
    for (let i = 0; i < 12; i++) {
        AveragePriceData.push(AJData[i][3]);
    }
    option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            
                type: 'shadow'        
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '平均單價',
                type: 'bar',
                barWidth: '60%',
                data: AveragePriceData
            }
        ]
    };
    Average_Price_StatisticsChart.setOption(option);
};


// 今年前10名自費項目
function TOP10OwnExpense() {
    let TOP10 = {"A0":0, "A1":0, "A2":0, "A3":0, "A4":0,
                 "A5":0, "A6":0, "A7":0, "A8":0, "A9":0,
                 "A10":0, "A11":0, "A12":0, "A13":0, "A14":0,
                 "A15":0, "A16":0, "A17":0, "A18":0, "A19":0,
                 "A20":0, "A21":0, "A22":0, "A23":0, "A24":0,
                 "A25":0, "A26":0, "A27":0, "A28":0, "A29":0,
                 "A30":0, "A31":0, "A32":0, "A33":0}
    // 提取檔案中平均單價金額
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 34; j++) {
            let item;
            let target = "A"+j;
            if (AJData[i][(j+4)] !="") {
                item = AJData[i][(j+4)];
            }else{
                item = 0
            };
            TOP10[target] = parseInt(TOP10[target])  + parseInt(item);
        }
    }
    // 排序並填入項目名稱
    let Ranking = Object.keys(TOP10).map(function(key) {
        let ProjectName = ProjectTranslation[key];
        return [ProjectName, TOP10[key]];
    });
    Ranking.sort(function(first, second) {
        return second[1] - first[1];
    });
    // 最多的值做為參數
    let RankingMax = (Ranking[0][1]*1.2);
    let myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#3398DB'];
    option = {
        backgroundColor: '#FFFFFF',
        grid: {
            left: '0%',
            top: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: [{
            show: false,
        }],
        yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            offset: '0',
            axisLabel: {
                textStyle: {
                    color: '#1C1C1C',
                    fontSize: '16',
                }
            },
            data: [Ranking[9][0], Ranking[8][0], Ranking[7][0], Ranking[6][0], Ranking[5][0], Ranking[4][0], Ranking[3][0], Ranking[2][0], Ranking[1][0], Ranking[0][0]]
        }, {
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
                textStyle: {
                    color: '#1C1C1C',
                    fontSize: '16',
                }
            },
            data: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
        }, {
            axisLine: {
                lineStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [],
        }],
        series: [{
                name: '溫度長度',
                type: 'bar',
                yAxisIndex: 0,
                data: [Ranking[9][1], Ranking[8][1], Ranking[7][1], Ranking[6][1], Ranking[5][1], Ranking[4][1], Ranking[3][1], Ranking[2][1], Ranking[1][1], Ranking[0][1]],
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            color: '#1C1C1C',
                            fontSize: '16',
                        }
                    }
                },
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                z: 4
            }, {
                name: '白框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [(RankingMax*0.99), (RankingMax*0.99), (RankingMax*0.99), (RankingMax*0.99), (RankingMax*0.99), (RankingMax*0.99), (RankingMax*0.99), (RankingMax*0.99), (RankingMax*0.99), (RankingMax*0.99)],
                barWidth: 20,
                itemStyle: {
                    normal: {
                        color: '#FFFFFF',
                        barBorderRadius: 5,
                    }
                },
                z: 1
            }, {
                name: '外框',
                type: 'bar',
                yAxisIndex: 2,
                barGap: '-100%',
                data: [RankingMax, RankingMax, RankingMax, RankingMax, RankingMax, RankingMax, RankingMax, RankingMax, RankingMax, RankingMax],
                barWidth: 24,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                        barBorderRadius: 5,
                    }
                },
                z: 0
             },
            // {
            //     name: '圓底',
            //     type: 'scatter',
            //     hoverAnimation: false,
            //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //     yAxisIndex: 2,
            //     symbolSize: 25,
            //     itemStyle: {
            //         normal: {
            //             color: function(params) {
            //                 var num = myColor.length;
            //                 return myColor[params.dataIndex % num]
            //             },
            //             opacity: 1,
            //         }
            //     },
            //     z: 2
            // }
        ]
    };
    TOP10_OwnExpenseChart.setOption(option);
};


// =======================================
// 字典
var ProjectTranslation = {"A0":"自費洗牙", "A1":"自費塗氟", "A2":"自費補牙", "A3":"X光片", "A4":"溝隙封填",
"A5":"骨膠原蛋白", "A6":"一日/臨時假牙", "A7":"貼片", "A8":"全瓷牙冠", "A9":"半貴金屬牙冠",
"A10":"貴金屬牙冠", "A11":"高貴金屬牙冠", "A12":"牙柱釘", "A13":"Jelstar鈀合金", "A14":"cameo金合金",
"A15":"INLAY/ONLAY", "A16":"隱形矯正", "A17":"其他矯正", "A18":"空間維持器", "A19":"TCI",
"A20":"植牙補骨手術GBR", "A21":"植牙補肉手術FGG", "A22":"牙冠增高術CLP", "A23":"IMP-1", "A24":"IMP-3",
"A25":"AO4-1", "A26":"AO4-3", "A27":"AO4-4", "A28":"牙周雷射", "A29":"冷光美白",
"A30":"居家美白", "A31":"大臼齒", "A32":"前牙", "A33":"小臼齒"}