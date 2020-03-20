// 假資料
// 取得醫生名字與編號
var DoctorName = ["A醫生:A000000000", "B醫生:B111111111", "C醫生:C222222222", "D醫生:D333333333", "E醫生:E999999999"];
// 假資料
var AJData = [
    {A000000000:"50000", GGGGGGG:"123456", C222222222:"50000", D333333333:"50000", E999999999:"90000"},
    {A000000000:"90000", B111111111:"80000", C222222222:"60000", D333333333:"70000", E999999999:"90000"},
    {A000000000:"70000", B111111111:"80000", C222222222:"57000", D333333333:"70000", E999999999:"90000"},
    {A000000000:"60000", B111111111:"80000", C222222222:"59000", D333333333:"70000", E999999999:"90000"},
    {A000000000:"40000", B111111111:"80000", C222222222:"54000", D333333333:"70000", E999999999:"90000"},
    {A000000000:"30000", C222222222:"50000", D333333333:"70000", E999999999:"90000"},
    {A000000000:"10000", B111111111:"80000", C222222222:"58000", D333333333:"70000", E999999999:"90000"},
    {A000000000:"20000", B111111111:"80000", C222222222:"67000", D333333333:"70000", E999999999:"90000"},
    {A000000000:"50000", B111111111:"80000", C222222222:"150000", D333333333:"70000", E999999999:"90000"},
    {A000000000:"70000", B111111111:"80000", D333333333:"170000", E999999999:"90000"},
    {A000000000:"60000", B111111111:"80000", C222222222:"150000"},
    {A000000000:"80000", B111111111:"80000", E999999999:"190000", GGGGGGG:"123456"}    
];
// ======================================
//全域變數
// 今日時間宣告
var today=new Date();
// AJ傳送變數
var AJCondition = (today.getFullYear() - 1911);
// Echarts 繪圖
var NHIS_AmountStatisticsChart = echarts.init(document.getElementById('NHIS_AmountStatistics'));
// 建立接收資料填入表格
var DataTable = [];
// 建立字典對應查詢
var DataDict = {};
//=======================================

$(document).ready(function(){
    // 資料載入
    InformationInsert();
    // 繪圖
    NHISAmountStatistics();
    // AJ進入頁面初次請求資料
    //AJ_NHIInformation();
    // 年度切換
    $("#SelfFilling_statistics_button_area").on("click", ".SelfFilling_button",function() {
        $("#SelfFilling_statistics_button_area .statistics_button_down").removeClass("statistics_button_down");
        $("#SelfFilling_statistics_button_area .SelfFilling_button").addClass("statistics_button_up");
        $(this).addClass("statistics_button_down");
        $(this).removeClass("statistics_button_up");
        let ROCyear = $(this).text().slice(0, 3);
        AJCondition = ROCyear;
        ROCYearChange();
        // AJ請求資料
        AJ_NHIInformation();
    });
});

// 接收資料創造按鍵與填入表格
function InformationInsert(){
    // 還原化DataTable與字典
    DataTable = [];
    DataDict = {};
    // 自費項目統計年份
    let yearhtml = '<div id="SelfFilling_statistics_text">年度分類:</div><div class="SelfFilling_button statistics_button_up">' +
    (today.getFullYear() - 1913) + '年度</div><div class="SelfFilling_button statistics_button_up">' +
    (today.getFullYear() - 1912) + '年度</div><div class="SelfFilling_button statistics_button_down">' +
    (today.getFullYear() - 1911) + '年度</div>'
    document.getElementById("SelfFilling_statistics_button_area").innerHTML = yearhtml;
    // 年度/項目填入
    ROCYearChange();
    // 計算醫生數量並導入表格
    let tbodyhtml = "";
    for (let i = 0; i < DoctorName.length; i++) {
        let Doctor = DoctorName[i].split(":");
        let tdfirsthtml = '<tr><td>' + 
        Doctor[0] + '<input type="text" class="hide_on_bush" value="' + 
        Doctor[1] + '" readonly="readonly"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
        tbodyhtml += tdfirsthtml;
        // 為DataTable創建表頭
        DataTable.push([Doctor[1], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        // 寫入DataDict字典以利下方對應查詢
        DataDict[Doctor[1]] = i;
    };

    $("#NHIS_table tbody").append(tbodyhtml);
    // 將資料改寫進DataTable
    for (let a = 0; a < AJData.length; a++) {
        let Amount;
        let Dataposition;
        for (let b in AJData[a]) {
            // 取出每一個AJData的值
            Amount = AJData[a][b];
            // 檢查醫生代號是否存在
            if (b in DataDict) {
                // 以醫生id對照datadict字典
                Dataposition = DataDict[b];
                // 填入datatable位置
                DataTable[Dataposition][(a+1)] = Number(Amount);
            }
        }
    }
    // 對應編號表格填入資料
    for (let j = 0; j < DataTable.length; j++) {
        let CorrespondID = DataTable[j][0];
        let InputAims = "input[value=" + CorrespondID + "]";
        for (let k = 2; k < 14; k++) {
            let ChildAims = 'td:nth-child(' + k + ')';
            $(InputAims).parents("tr").find(ChildAims).text(DataTable[j][(k-1)]);
        }
    }
    // 繪圖
}

// 年度/項目變更
function ROCYearChange() {
    let pickyear = document.getElementsByClassName("statistics_button_down")[0];
    let ROCyear = pickyear.innerText.slice(0, 3);
    let thhtml = '<th>醫師/月份</th>'
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

// 醫師健保金額統計圖繪製
function NHISAmountStatistics() {
    // 取得Name的Array
    let NameArray = [];
    // 有效資料陣列
    let EffectiveData = [];
    for (let a = 0; a < DataTable.length; a++) {
        let InputAims = "input[value=" + DataTable[a][0] + "]";
        // 確保取得Name
        if ($(InputAims).length != 0) {
            NameArray.push($(InputAims).parent().text());
            // 將符合的資料提取排序成新陣列
            let Cuthead = DataTable[a];
            Cuthead.shift();
            EffectiveData.push(Cuthead);
        }
    };
    let myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#3398DB'];
    // 折線
    let Polyline = [];
    for (var i = 0; i < NameArray.length; i++) {
        Polyline.push({
            name: NameArray[i],
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 10,            
            itemStyle: {
                //color: myColor[i],
                borderColor: "#FAFAFA",
                borderWidth: 2,
                shadowColor: 'rgba(0, 0, 0, .6)',
                shadowBlur: 2,
                // shadowOffsetY: 2,
                // shadowOffsetX: 2,
            },
            tooltip: {
                show: true
            },
            
            data: EffectiveData[i]
        },);
    };
    option = {
        tooltip: {
            trigger: 'item',           
            formatter: '{a} <br/>{b} : {c}'
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        legend: {
            data: NameArray
        },
        yAxis: {
            type: 'value'
        },
        series: Polyline
    };
    NHIS_AmountStatisticsChart.setOption(option);
};

// AJ請求
function AJ_NHIInformation() {
    $.ajax({
        url: "",
        type: "POST",
        dataType: "Json",
        data: {
            AJCondition // 傳給後端時間(民國年)
        },
        success: function (doc) {
                AJData = doc;
                // 資料載入
                InformationInsert();
                // 繪圖
                NHISAmountStatistics();
        }
    });
};