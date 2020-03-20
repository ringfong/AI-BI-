// 假資料
// 手動輸入自費金額
var Own_ExpenseData; 
// 健保總金額
var Total_Amount_HisData;

// 手動輸入當月診次數
var Consultation_CountData; 

// 治療項目
var Item_AmountData1;
// 治療項目金額
var Item_AmountData2 ;

// 病患地址分布
var PatientAddressData;

// 年齡+時段分類
var TimeDistributedData1;
// 掛號時段分布
var TimeDistributedData2;
// 年齡+時段分類
var TimeDistributedData3;


//============================================================================================
// 共用參數
// var colorpick = ['#2AC0B1', ' #6206ED', '#2B51ED', '#FCC118','#F5DDE3','#D3A99F','#A32E9A','#C16954','#471D13','#464713','#592EA3','#1E11E7','#11A3E7','#8C9295','#18B283','#57A262','#A2AB1A','#04F512','#CE1F2F','#9D7FB0'];
// 月份量
var month_view = 6;
// 月份
var month_array = [];


var Total_AmountChart = echarts.init(document.getElementById('Total_Amount'));
var Consultation_CountChart = echarts.init(document.getElementById('Consultation_Count'));
var Single_TurnoverChart = echarts.init(document.getElementById('Single_Turnover'));
var TimeDistributedChart = echarts.init(document.getElementById('Time_Distributed'));
var Item_AmountChart = echarts.init(document.getElementById('Item_Amount'));
var PatientAddressChart = echarts.init(document.getElementById('PatientAddress'));

// $(document).ready(function(){

// });

// 取得月份
function month_array_catch() {
    month_array = [];
    let today = new Date();
    let month_count = (today.getMonth()+1);
    
    for (let i = (month_count - month_view); i < month_count; i++) {
        if (i < 1) {
            month_array.push((i + 12)+"月");
        } else {
            month_array.push((i)+"月");
        }
    }
}



// 總金額
function Total_Amount(e,f) {
    Own_ExpenseData=e;
    Total_Amount_HisData=f;
    let Total_AmountData = [];
    // 加總健保與自費
    for (let i = 0; i < month_view; i++) {
        let count = Own_ExpenseData[i] + Total_Amount_HisData[i];
        Total_AmountData.push(count);
    };
    // 總金額比對更改
    $("#Total_Amount_lastmonth").text(Total_AmountData[(month_view-1)]);
    if (Total_AmountData[(month_view-2)]>Total_AmountData[(month_view-1)]) {
        $("#Total_Amount_compare").removeClass("compare_up");
        $("#Total_Amount_compare").addClass("compare_down");
        $("#Total_Amount_compare_updown").text("少");
    }
    else{
        $("#Total_Amount_compare").removeClass("compare_down");
        $("#Total_Amount_compare").addClass("compare_up");
        $("#Total_Amount_compare_updown").text("多");
    };
    let difference = (Total_AmountData[(month_view-1)] - Total_AmountData[(month_view-2)])
    if (difference < 0) {
        difference = difference* (-1);
    }
    $("#Total_Amount_compare").text(difference.toFixed(0));
    option = {
        color: ['#9657FF'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            
                type: 'shadow'      
            }
        },
        grid: {
            y2 : 0
        },
        xAxis: [
            {
                type: 'category',
                "show" : false,
                data: month_array,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                "show" : false,
                type: 'value'
            }
        ],
        series: [
            {
                name: '總金額',
                type: 'bar',
                barWidth: '60%',
                data: Total_AmountData
            }
        ]
    };
    Total_AmountChart.setOption(option);
};

// 診次數
function Consultation_Count(e) {
    Consultation_CountData=e;
    // 診次比對更改
    $("#Consultation_Count_lastmonth").text(Consultation_CountData[(month_view-1)]);
    if (Consultation_CountData[(month_view-2)]>Consultation_CountData[(month_view-1)]) {
        $("#Consultation_Count_compare").removeClass("compare_up");
        $("#Consultation_Count_compare").addClass("compare_down");
        $("#Consultation_Count_compare_updown").text("少");
    }
    else{
        $("#Consultation_Count_compare").removeClass("compare_down");
        $("#Consultation_Count_compare").addClass("compare_up");
        $("#Consultation_Count_compare_updown").text("多");
    };
    let difference = (Consultation_CountData[(month_view-1)] - Consultation_CountData[(month_view-2)])
    if (difference < 0) {
        difference = difference* (-1);
    }
    $("#Consultation_Count_compare").text(difference);
    option = {
        color: ['#FCC118'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            
                type: 'shadow'      
            }
        },
        grid: {
            y2 : 0
        },
        xAxis: [
            {
                type: 'category',
                "show" : false,
                data: month_array,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                "show" : false,
                type: 'value'
            }
        ],
        series: [
            {
                name: '診次數',
                type: 'bar',
                barWidth: '60%',
                data: Consultation_CountData
            }
        ]
    };
    Consultation_CountChart.setOption(option);
};

// 單一診營業額
function Single_Turnover(e) {
    Consultation_CountData=e;
    let Single_TurnoverData = [];
    // 單一診營業額計算
    for (let i = 0; i < month_view; i++) {
        // 避免分母為0
        let chairs = 1;
        if (Consultation_CountData[i] == 0 | Consultation_CountData[i] == undefined) {
            chairs = 1;
        }else{
            chairs = Consultation_CountData[i];
        };
        let count = ((Own_ExpenseData[i] + Total_Amount_HisData[i])/chairs);
        count = Math.floor(count * 100) / 100;
        Single_TurnoverData.push(count);
    };
    // 單一診營業額比對更改
    $("#Single_Turnover_lastmonth").text(Single_TurnoverData[(month_view-1)]);
    if (Single_TurnoverData[(month_view-2)] > Single_TurnoverData[(month_view-1)]) {
        $("#Single_Turnover_compare").removeClass("compare_up");
        $("#Single_Turnover_compare").addClass("compare_down");
        $("#Single_Turnover_compare_updown").text("少");
    }
    else{
        $("#Single_Turnover_compare").removeClass("compare_down");
        $("#Single_Turnover_compare").addClass("compare_up");
        $("#Single_Turnover_compare_updown").text("多");
    };
    let difference = (Single_TurnoverData[(month_view-1)] - Single_TurnoverData[(month_view-2)])
    if (difference < 0) {
        difference = difference* (-1);
    }
    $("#Single_Turnover_compare").text(difference.toFixed(2));
    option = {
        color: ['#2AC0B1'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            
                type: 'shadow'      
            }
        },
        grid: {
            y2 : 0
        },
        xAxis: [
            {
                type: 'category',
                "show" : false,
                data: month_array,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                "show" : false,
                type: 'value'
            }
        ],
        series: [
            {
                name: '單一診營業額',
                type: 'bar',
                barWidth: '60%',
                data: Single_TurnoverData
            }
        ]
    };
    Single_TurnoverChart.setOption(option);
};

// 治療項目/治療項目金額區域
function Item_Amount(e,f) {
    Item_AmountData1=e;
    Item_AmountData2=f;
    // 提取name組成新的array
    let namelist = [];
    for (let i = 0; i < Item_AmountData1.length; i++) {
        namelist.push(Item_AmountData1[i]["name"]);
    };
    for (let j = 0; j < Item_AmountData2.length; j++) {
        namelist.push(Item_AmountData2[j]["name"]);
    };
    namelist = namelist.filter( (el, i, arr) => arr.indexOf(el) === i);
    
    option = {
        // color: [
        //     "#2AC0B1",
        //     "#9657FF",
        //     "#2B51ED",
        //     "#FCC118",
        //     "#F5DDE3",
        //     "#D3A99F",
        //     "#A32E9A",
        //     "#C16954",
        //     "#471D13",
        //     "#464713",
        //     "#592EA3",
        //     "#1E11E7",
        //     "#11A3E7",
        //     "#8C9295",
        //     "#18B283",
        //     "#57A262",
        //     "#A2AB1A",
        //     "#04F512",
        //     "#CE1F2F",
        //     "#9D7FB0"
        //   ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 30,
            top: 'center',
            data: namelist
        },
        series: [
            {
                name: '治療項目',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '45%'],
                left: '15%',
                label: {
                    fontSize: 16,
                    position: 'inner'
                },
                labelLine: {
                    show: false
                },
                data: Item_AmountData1
            },
            {
                name: '治療項目金額',
                type: 'pie',
                radius: ['55%', '75%'],
               left: "15%",
                // top: "0%",
                label: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            fontSize: 16,
                            borderRadius: 2
                        }
                    }
                },
                data: Item_AmountData2
            }
        ]
    };
    Item_AmountChart.setOption(option);
};

// 病患地址分布
function PatientAddress(e) {
    // 提取name組成新的array
    PatientAddressData=e;
    let namelist = [];
    for (let i = 0; i < PatientAddressData.length; i++) {
        namelist.push(PatientAddressData[i]["name"]);
    };
    namelist = namelist.filter( (el, i, arr) => arr.indexOf(el) === i);
    // 提取name選擇預設顯示
    let select = {};
    for (let k = 0; k < 5; k++) {
        select[namelist[k]] = true;
    };
    for (let l = 5; l < namelist.length; l++) {
        select[namelist[l]] = false;
    };

    option = {
        // color: [
        //     "#2AC0B1",
        //     "#9657FF",
        //     "#2B51ED",
        //     "#FCC118",
        //     "#F5DDE3",
        //     "#D3A99F",
        //     "#A32E9A",
        //     "#C16954",
        //     "#471D13",
        //     "#464713",
        //     "#592EA3",
        //     "#1E11E7",
        //     "#11A3E7",
        //     "#8C9295",
        //     "#18B283",
        //     "#57A262",
        //     "#A2AB1A",
        //     "#04F512",
        //     "#CE1F2F",
        //     "#9D7FB0"
        //   ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 50,
            top: 20,
            bottom: 20,
            data: namelist,
            selected: select
        },
        series: [
            {
                name: '位置',
                type: 'pie',
                radius: '75%',
                center: ['45%', '50%'],                
                data: PatientAddressData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label : {
                    fontSize:18
                }
            }
        ]
    };
    PatientAddressChart.setOption(option);
};

// 時段分布
function TimeDistributed(e,f,g) {
    TimeDistributedData1=e;
    TimeDistributedData2=f;
    TimeDistributedData3=g;
  option1 = {
    legend: {},
    // color: [
    //     "#2AC0B1",
    //     "#9657FF",
    //     "#2B51ED",
    //     "#FCC118",
    //     "#F5DDE3",
    //     "#D3A99F",
    //     "#A32E9A",
    //     "#C16954",
    //     "#471D13",
    //     "#464713",
    //     "#592EA3",
    //     "#1E11E7",
    //     "#11A3E7",
    //     "#8C9295",
    //     "#18B283",
    //     "#57A262",
    //     "#A2AB1A",
    //     "#04F512",
    //     "#CE1F2F",
    //     "#9D7FB0"
    //   ],
    tooltip: {
        trigger: 'axis'
    },
    dataset: {
        source: TimeDistributedData1
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '55%'},// 距離上方距離有55%無10%
    series: [
        {type: 'line',  seriesLayoutBy: 'row'},
        {type: 'line',  seriesLayoutBy: 'row'},
        {type: 'line',  seriesLayoutBy: 'row'},
        {type: 'line',  seriesLayoutBy: 'row'},
        { //顯示餅圖
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
                formatter: '{b}: {@一早} ({d}%)',
            },
            encode: {
                itemName: '門診時間',
                value: '一早',
                tooltip: '一早'
            }
        }
    ]
  };
  
TimeDistributedChart.on('updateAxisPointer', function (event) {
    let aaa = document.getElementById("age_time");
    if (aaa.checked){
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            TimeDistributedChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    };
});
    
  option2 = {
    legend: {},
    tooltip: {
        trigger: 'axis'
    },
    dataset: {
        source: TimeDistributedData2
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '10%'},// 距離上方距離有55%無10%
    series: [
        {type: 'line', smooth: true, seriesLayoutBy: 'row',areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
            }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
            }])
        }}
    ]
  };
  option3 = {
    legend: {},
    tooltip: {
        trigger: 'axis'
    },
    dataset: {
        source: TimeDistributedData3
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '10%'},// 距離上方距離有55%無10%
    series: [
        {type: 'line', smooth: true, seriesLayoutBy: 'row',areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
            }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
            }])
        }}
    ]
  };
  TimeDistributedChart.setOption(option1);
  $('input[type=radio][name=td_type]').change(function() {
        if (this.id == 'age_time') {
            $('#timedistributed_text').text("年齡+時段分類");
            TimeDistributedChart.clear();
            TimeDistributedChart.setOption(option1);
        }
        else if (this.id == 'registered_time') {
            $('#timedistributed_text').text("掛號時段分布");
            TimeDistributedChart.clear();
            TimeDistributedChart.setOption(option2);
        }
        else if (this.id == 'reservation_time') {
            $('#timedistributed_text').text("預約時段率");
            TimeDistributedChart.clear();
            TimeDistributedChart.setOption(option3);
        }
    });
};