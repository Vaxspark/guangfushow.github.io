
function filterDataPoints(dataPoints, mapName) {
    return dataPoints.filter(point => {
        return point.diqv === mapName;
    });
} function updateSymbolSize(dataPoints) {
    for (var i = 0; i < dataPoints.length; i++) {
        var dataPoint = dataPoints[i];
        // 将 symbolSize 属性重新赋值为 fontSize(0.2) * mianji / 49600
        dataPoint.symbolSize = fontSize(0.05) + fontSize(0.2) * dataPoint.mianji / 10000;
    }

    // 返回修改后的数据点数组
    return dataPoints;
}

//echarts绘图
function initEcharts(geoJson, name, chart, alladcode) {
    updateSymbolSize(dataPoints)
    echarts.registerMap(name, geoJson);
    let option = {
        title: {
            text: name,
            left: 'center',
            show: false, // 显示标题
            textStyle: {
                // 显示标题
                fontSize: fontSize(0.3), // 设置标题文字大小
                color: 'white' // 设置标题文字颜色
            }
        },
        geo: {
            type: 'map',
            map: name,
            label: {
                show: false, // 显示区域名
                fontSize: fontSize(0.12), // 设置字体大小
                fontWeight: 'bold', // 设置字体粗细
                color: 'white' // 设置字体颜色
                // 其他样式设置，如字体家族、对齐方式等，可以根据需要自行添加
            },
            itemStyle: {
                normal: {
                    areaColor: '#1890ff', // 区域颜色''
                    borderColor: '#083967', // 区域边缘颜色
                    borderWidth: fontSize(0.02) // 区域边缘宽度
                },
                emphasis: {
                    areaColor: '#48c7ff', // 高亮时的区域颜色
                    borderColor: '#333' // 高亮时的区域边缘颜色
                }
            }
        },
        series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            // 在加载地图时，根据地图的名称过滤数据点
            data: filterDataPoints(dataPoints, name),

            label: {
                show: false,
                formatter: '{b}',
                color: '#48c7ff',
                position: 'right',
                fontSize: 12
            },
            itemStyle: {
                color: '#fbfbf1'
            },

        }]
    }
    chart.setOption(option);
    // 解绑click事件
    chart.off("click");
    //给地图添加监听事件
    chart.on('click', params => {
        if (params.componentType === 'series' && params.seriesType === 'scatter') {
            var name = params.name;
            var data_cnt = dataPoints.find(function (item) {
                return item.name === name;
            });
            echarts.dispose(document.getElementById('fb1'));
            document.querySelectorAll('.boxall .alltitle')[0].textContent = params.name + '场站能源需求与供给'; // 获取所有具有类名为 "boxall" 的元素内部的 "alltitle" 元素
            document.querySelectorAll('.boxall .alltitle')[1].textContent = params.name + '场站充电需求';
            document.querySelectorAll('.boxall .alltitle')[2].textContent = params.name + '场站光伏化后需求';
            document.querySelectorAll('.boxall .alltitle')[3].textContent = params.name + '场站光伏化效益';
            document.querySelectorAll('.boxall .alltitle')[4].textContent = params.name + '光伏发电变化表（天）';
            document.querySelectorAll('.boxall .alltitle')[5].textContent = params.name + '场站季节性光伏量';
            document.getElementById('场站能源供给').innerHTML = '';
            echarts.dispose(document.getElementById('场站日光伏发电量分布'));
            echarts.dispose(document.getElementById('echart6'));
            document.getElementById('场站能源需求').innerHTML = '';
            echarts.dispose(document.getElementById('充电需求排名'));
            echarts_zuo1_1(name);
            echarts_you1_1(name);
            echarts_4_1(name);
            echarts_2_1(data_cnt.num);
            echarts_3_1(data_cnt.num);
            echarts_6_1(data_cnt.num)
        } else {

            let clickRegionCode = alladcode.filter(areaJson => areaJson.name === params.name)[0].adcode;
            getGeoJson(clickRegionCode + '.json').then(regionGeoJson => {
                initEcharts(regionGeoJson, params.name, chart, alladcode, dataPoints);
                // 在地图下钻时，动态过滤数据点，确保只显示与地图名称匹配的数据点
                chart.setOption({
                    series: [{
                        data: filterDataPoints(dataPoints, params.name)
                    }]
                });
                /*  echarts.dispose(document.getElementById('场站日光伏发电量分布'));
                  document.querySelectorAll('.boxall .alltitle')[0].textContent = '场站能源需求'; // 获取所有具有类名为 "boxall" 的元素内部的 "alltitle" 元素
                  document.querySelectorAll('.boxall .alltitle')[1].textContent = '充电需求排名';
                  document.querySelectorAll('.boxall .alltitle')[2].textContent = '每日能耗分布';
                  document.querySelectorAll('.boxall .alltitle')[3].textContent = '场站能源供给';
                  document.querySelectorAll('.boxall .alltitle')[4].textContent = '场站日光伏发电量分布';
                  document.querySelectorAll('.boxall .alltitle')[5].textContent = '场站光伏发电量分布';
                  echarts.dispose(document.getElementById('fb1'));
                  echarts.dispose(document.getElementById('echart6'));
                  echarts.dispose(document.getElementById('充电需求排名'));
                  echarts_zuo1();
                  echarts_zuo2();
                  echarts_you1();
                  echarts_zuo31();
                  echarts_you2();
  
                  echarts_you3();
  */
            });

        }
    })
    chart.off("dblclick");
    chart.on('dblclick', function (params) {
        if (params.seriesType === 'scatter') {
            return;
        }

        getGeoJson('640100_full.json').then(function (chinaGeoJson) {
            initEcharts(chinaGeoJson, '银川', chart, alladcode, dataPoints);
        });
        echarts.dispose(document.getElementById('场站日光伏发电量分布'));
        document.querySelectorAll('.boxall .alltitle')[0].textContent = '场站能源需求'; // 获取所有具有类名为 "boxall" 的元素内部的 "alltitle" 元素
        document.querySelectorAll('.boxall .alltitle')[1].textContent = '充电需求排名';
        document.querySelectorAll('.boxall .alltitle')[2].textContent = '每日能耗分布';
        document.querySelectorAll('.boxall .alltitle')[3].textContent = '场站能源供给';
        document.querySelectorAll('.boxall .alltitle')[4].textContent = '场站日光伏发电量分布';
        document.querySelectorAll('.boxall .alltitle')[5].textContent = '场站光伏发电量分布';
        echarts.dispose(document.getElementById('fb1'));
        echarts.dispose(document.getElementById('echart6'));
        echarts.dispose(document.getElementById('充电需求排名'));
        echarts_zuo1();
        echarts_zuo2();
        echarts_you1();
        echarts_zuo31();
        echarts_you2();

        echarts_you3();
    });

}
//获取地图json数据
async function getGeoJson(jsonName) {
    return await $.get(publicUrl + jsonName)
}

function filterDataPoints(dataPoints, mapName) {
    return dataPoints.filter(point => {
        return point.diqv === mapName;
    });
}
var dataPoints = [
    { num: 1, name: "银川市公共交通有限公司", mianji: 2498, zujiangeshu: 1957.310036, zhuangjirongliang: 639.939, zuixiaogeshu: 8, wukongtiao: 6560.995345, youkongtiao: 14656.62034, tingkaoshuliang: 517, diqv: "金凤区", symbolSize: 12, value: [106.2385408, 38.52781197], chunengrongliang: 5.831284713 },
    { num: 2, name: "海宝东路公交首末站", mianji: 584, zujiangeshu: 457.5936994, zhuangjirongliang: 149.439, zuixiaogeshu: 4, wukongtiao: 2678.754738, youkongtiao: 5979.643627, tingkaoshuliang: 248, diqv: "兴庆区", symbolSize: 13, value: [106.3092683, 38.4845395], chunengrongliang: 2.382146791 },
    { num: 3, name: "银川市公共交通公司运营一分公司", mianji: 5806, zujiangeshu: 4549.296265, zhuangjirongliang: 1487.523, zuixiaogeshu: 6, wukongtiao: 8936.008592, youkongtiao: 18255.78081, tingkaoshuliang: 515, diqv: "西夏区", symbolSize: 14, value: [106.1667408, 38.49583284], chunengrongliang: 11.32488174 },
    { num: 4, name: "美德亨国际家居", mianji: 1030, zujiangeshu: 807.0573807, zhuangjirongliang: 263.889, zuixiaogeshu: 4, wukongtiao: 4503.014802, youkongtiao: 9241.284247, tingkaoshuliang: 245, diqv: "兴庆区", symbolSize: 15, value: [106.291006, 38.45369049], chunengrongliang: 6.003266897 },
    { num: 5, name: "览山公园", mianji: 1303, zujiangeshu: 1020.966764, zhuangjirongliang: 333.54, zuixiaogeshu: 3, wukongtiao: 2690.460484, youkongtiao: 5572.435484, tingkaoshuliang: 161, diqv: "金凤区", symbolSize: 16, value: [106.2144236, 38.53006015], chunengrongliang: 59.27869994 },
    { num: 6, name: "友爱公交车场", mianji: 715, zujiangeshu: 560.2388614, zhuangjirongliang: 183.12, zuixiaogeshu: 6, wukongtiao: 9233.497053, youkongtiao: 18632.10816, tingkaoshuliang: 563, diqv: "兴庆区", symbolSize: 17, value: [106.3141368, 38.46659081], chunengrongliang: 0 },
    { num: 7, name: "北门公交车场", mianji: 5276, zujiangeshu: 4134.014311, zhuangjirongliang: 1351.818, zuixiaogeshu: 5, wukongtiao: 7206.30242, youkongtiao: 15600.23575, tingkaoshuliang: 600, diqv: "兴庆区", symbolSize: 18, value: [106.289576, 38.47926551], chunengrongliang: 13.35429825 },
    { num: 8, name: "公交驾校", mianji: 1714, zujiangeshu: 1343.006166, zhuangjirongliang: 439.161, zuixiaogeshu: 4, wukongtiao: 5070.028496, youkongtiao: 10179.61183, tingkaoshuliang: 377, diqv: "金凤区", symbolSize: 19, value: [106.2243541, 38.42192387], chunengrongliang: 0.865069805 },
    { num: 9, name: "银川妇女儿童中心", mianji: 0, zujiangeshu: 0, zhuangjirongliang: 0, zuixiaogeshu: 3, wukongtiao: 2358.569366, youkongtiao: 5765.1027, tingkaoshuliang: 164, diqv: "金凤区", symbolSize: 20, value: [106.2241979, 38.45856946], chunengrongliang: 0 },
    { num: 10, name: "通达北街公交首末站", mianji: 600, zujiangeshu: 470.130513, zhuangjirongliang: 153.69, zuixiaogeshu: 9, wukongtiao: 10433.60981, youkongtiao: 21310.28203, tingkaoshuliang: 559, diqv: "金凤区", symbolSize: 21, value: [106.178093, 38.50954363], chunengrongliang: 0.263592696 },
    { num: 11, name: "石油城公交首末站", mianji: 2007, zujiangeshu: 1572.586566, zhuangjirongliang: 514.044, zuixiaogeshu: 4, wukongtiao: 2771.78397, youkongtiao: 5925.28397, tingkaoshuliang: 252, diqv: "兴庆区", symbolSize: 22, value: [106.3237385, 38.45370991], chunengrongliang: 2.595535372 },
    { num: 12, name: "八一车场", mianji: 854, zujiangeshu: 669.1524302, zhuangjirongliang: 218.763, zuixiaogeshu: 6, wukongtiao: 10287.0737, youkongtiao: 19827.97648, tingkaoshuliang: 531, diqv: "西夏区", symbolSize: 23, value: [106.1093031, 38.50412056], chunengrongliang: 2.324375126 },
    { num: 13, name: "中国银川国际商贸城", mianji: 162, zujiangeshu: 126.9352385, zhuangjirongliang: 41.202, zuixiaogeshu: 4, wukongtiao: 5195.624629, youkongtiao: 10084.2413, tingkaoshuliang: 405, diqv: "兴庆区", symbolSize: 24, value: [106.3141614, 38.49312806], chunengrongliang: 0 },
    { num: 14, name: "会展中心公交车场", mianji: 920, zujiangeshu: 720.8667867, zhuangjirongliang: 235.44, zuixiaogeshu: 5, wukongtiao: 3927.625919, youkongtiao: 7790.803697, tingkaoshuliang: 329, diqv: "金凤区", symbolSize: 25, value: [106.2170511, 38.48769533], chunengrongliang: 2.242919189 },
    { num: 15, name: "金凤工业园公交首末站", mianji: 1690, zujiangeshu: 1324.200945, zhuangjirongliang: 432.948, zuixiaogeshu: 3, wukongtiao: 1575.035637, youkongtiao: 3352.330081, tingkaoshuliang: 98, diqv: "金凤区", symbolSize: 26, value: [106.1552418, 38.4420653], chunengrongliang: 56.58555198 },
    { num: 16, name: "宁教基地公交首末站", mianji: 420, zujiangeshu: 329.0913591, zhuangjirongliang: 107.583, zuixiaogeshu: 2, wukongtiao: 1347.030135, youkongtiao: 2865.855135, tingkaoshuliang: 61, diqv: "西夏区", symbolSize: 27, value: [106.141756, 38.519825], chunengrongliang: 2.512363099 },
    { num: 17, name: "芦花洲公交首末站", mianji: 664, zujiangeshu: 520.2777678, zhuangjirongliang: 170.04, zuixiaogeshu: 3, wukongtiao: 908.2985847, youkongtiao: 1679.50414, tingkaoshuliang: 51, diqv: "西夏区", symbolSize: 28, value: [106.167498, 38.53580789], chunengrongliang: 108.9734963 },
    { num: 18, name: "化肥公交车场", mianji: 2080, zujiangeshu: 1629.785779, zhuangjirongliang: 532.683, zuixiaogeshu: 4, wukongtiao: 4418.465399, youkongtiao: 9030.334844, tingkaoshuliang: 314, diqv: "西夏区", symbolSize: 29, value: [106.0933243, 38.48655431], chunengrongliang: 2.990825463 },
    { num: 19, name: "满城南街公交首末站", mianji: 1991, zujiangeshu: 1560.049752, zhuangjirongliang: 510.12, zuixiaogeshu: 2, wukongtiao: 1452.267546, youkongtiao: 3064.070324, tingkaoshuliang: 146, diqv: "金凤区", symbolSize: 30, value: [106.1901266, 38.46059894], chunengrongliang: 52.13603479 },
    { num: 20, name: "迎宾广场", mianji: 5452, zujiangeshu: 4271.919262, zhuangjirongliang: 1396.617, zuixiaogeshu: 8, wukongtiao: 16088.13558, youkongtiao: 33297.69392, tingkaoshuliang: 1099, diqv: "兴庆区", symbolSize: 31, value: [106.2798059, 38.41840594], chunengrongliang: 0 },
    { num: 21, name: "永宁公交车场", mianji: 975, zujiangeshu: 763.9620837, zhuangjirongliang: 249.501, zuixiaogeshu: 6, wukongtiao: 5542.657453, youkongtiao: 11633.53245, tingkaoshuliang: 319, diqv: "永宁县", symbolSize: 32, value: [106.2635145, 38.26396708], chunengrongliang: 0.054901849 },
    { num: 22, name: "同心路市场公交首末站", mianji: 458, zujiangeshu: 358.8662916, zhuangjirongliang: 117.066, zuixiaogeshu: 3, wukongtiao: 1342.397093, youkongtiao: 2810.783204, tingkaoshuliang: 81, diqv: "西夏区", symbolSize: 33, value: [106.1178909, 38.48514945], chunengrongliang: 34.33697148 },
    { num: 23, name: "上前城南区", mianji: 1397, zujiangeshu: 1094.620545, zhuangjirongliang: 357.738, zuixiaogeshu: 4, wukongtiao: 3319.629354, youkongtiao: 7140.879354, tingkaoshuliang: 177, diqv: "兴庆区", symbolSize: 34, value: [106.2827133, 38.40816885], chunengrongliang: 25.87638602 },
    { num: 24, name: "高桥公交首末站", mianji: 650, zujiangeshu: 509.3080558, zhuangjirongliang: 166.443, zuixiaogeshu: 2, wukongtiao: 1451.541707, youkongtiao: 3050.938929, tingkaoshuliang: 118, diqv: "金凤区", symbolSize: 35, value: [106.2566836, 38.41327283], chunengrongliang: 9.899652145 },
    { num: 25, name: "文昌南街公交首末站（下客站）", mianji: 2145, zujiangeshu: 1680.716584, zhuangjirongliang: 549.36, zuixiaogeshu: 1, wukongtiao: 832.2742652, youkongtiao: 1542.165932, tingkaoshuliang: 50, diqv: "西夏区", symbolSize: 36, value: [106.1015928, 38.41238811], chunengrongliang: 751.4025946 },
    { num: 26, name: "永宁王太公交首末站", mianji: 100, zujiangeshu: 78.35508551, zhuangjirongliang: 25.506, zuixiaogeshu: 3, wukongtiao: 1098.72203, youkongtiao: 2082.883141, tingkaoshuliang: 90, diqv: "永宁县", symbolSize: 37, value: [106.245279, 38.24606953], chunengrongliang: 3.823872709 },
    { num: 27, name: "贺兰县政务中心", mianji: 180, zujiangeshu: 141.0391539, zhuangjirongliang: 46.107, zuixiaogeshu: 2, wukongtiao: 732.1068714, youkongtiao: 1562.681871, tingkaoshuliang: 86, diqv: "贺兰县", symbolSize: 38, value: [106.358846, 38.5772893], chunengrongliang: 8.273859383 },
    { num: 28, name: "永宁县李俊通桥客运站", mianji: 387, zujiangeshu: 303.2341809, zhuangjirongliang: 99.081, zuixiaogeshu: 1, wukongtiao: 93.07275305, youkongtiao: 213.3505308, tingkaoshuliang: 4, diqv: "永宁县", symbolSize: 39, value: [106.3287462, 38.36743601], chunengrongliang: 0 },
    { num: 29, name: "公交服务大厅", mianji: 1271, zujiangeshu: 995.8931368, zhuangjirongliang: 325.365, zuixiaogeshu: 3, wukongtiao: 1432.051945, youkongtiao: 3084.960279, tingkaoshuliang: 119, diqv: "兴庆区", symbolSize: 40, value: [106.2699674, 38.46194357], chunengrongliang: 19.22374081 },
    { num: 30, name: "景安公交首末站", mianji: 603, zujiangeshu: 472.4811656, zhuangjirongliang: 154.344, zuixiaogeshu: 5, wukongtiao: 2871.711806, youkongtiao: 6686.292361, tingkaoshuliang: 268, diqv: "金凤区", symbolSize: 41, value: [106.2644186, 38.50926318], chunengrongliang: 3.912526056 },
    { num: 31, name: "滨河公交枢纽站", mianji: 2578, zujiangeshu: 2019.994104, zhuangjirongliang: 660.213, zuixiaogeshu: 3, wukongtiao: 1620.611892, youkongtiao: 2674.986892, tingkaoshuliang: 83, diqv: "兴庆区", symbolSize: 42, value: [106.4780128, 38.35794975], chunengrongliang: 191.9432995 },
    { num: 32, name: "掌政公交首末站", mianji: 4280, zujiangeshu: 3353.59766, zhuangjirongliang: 1096.431, zuixiaogeshu: 2, wukongtiao: 714.7792974, youkongtiao: 1656.973742, tingkaoshuliang: 51, diqv: "兴庆区", symbolSize: 43, value: [106.3606077, 38.41349291], chunengrongliang: 0 },
    { num: 33, name: "闽宁镇客运站", mianji: 1452, zujiangeshu: 1137.715842, zhuangjirongliang: 371.799, zuixiaogeshu: 1, wukongtiao: 172.6735687, youkongtiao: 260.3930132, tingkaoshuliang: 8, diqv: "永宁县", symbolSize: 44, value: [105.9734987, 38.24360987], chunengrongliang: 0 },
    { num: 34, name: "昊升汽车城", mianji: 1760, zujiangeshu: 1379.049505, zhuangjirongliang: 450.933, zuixiaogeshu: 4, wukongtiao: 2016.625776, youkongtiao: 4719.700776, tingkaoshuliang: 118, diqv: "永宁县", symbolSize: 45, value: [106.2612593, 38.34246756], chunengrongliang: 36.12516164 },
    { num: 35, name: "贺兰县烟草公司", mianji: 180, zujiangeshu: 141.0391539, zhuangjirongliang: 46.107, zuixiaogeshu: 3, wukongtiao: 1733.664804, youkongtiao: 4140.478693, tingkaoshuliang: 162, diqv: "贺兰县", symbolSize: 46, value: [106.3376842, 38.54505145], chunengrongliang: 1.490914209 },
    { num: 36, name: "西夏广场公交首末站", mianji: 318, zujiangeshu: 249.1691719, zhuangjirongliang: 81.423, zuixiaogeshu: 3, wukongtiao: 2876.960059, youkongtiao: 4811.535059, tingkaoshuliang: 128, diqv: "西夏区", symbolSize: 47, value: [106.0278875, 38.48509187], chunengrongliang: 1.129840706 },
    { num: 37, name: "陆坊公交车场", mianji: 3449, zujiangeshu: 2702.466899, zhuangjirongliang: 883.554, zuixiaogeshu: 1, wukongtiao: 70.09286286, youkongtiao: 156.3206406, tingkaoshuliang: 2, diqv: "永宁县", symbolSize: 48, value: [106.2263929, 38.36974626], chunengrongliang: 0 },
    { num: 38, name: "海吉星物流中心", mianji: 12548, zujiangeshu: 9831.996129, zhuangjirongliang: 3214.737, zuixiaogeshu: 1, wukongtiao: 1621.727495, youkongtiao: 3453.044162, tingkaoshuliang: 89, diqv: "贺兰县", symbolSize: 49, value: [106.3292172, 38.58008786], chunengrongliang: 0 },
    { num: 39, name: "奥特莱斯附近", mianji: 686, zujiangeshu: 537.5158866, zhuangjirongliang: 175.599, zuixiaogeshu: 3, wukongtiao: 3252.073287, youkongtiao: 6895.787176, tingkaoshuliang: 152, diqv: "贺兰县", symbolSize: 50, value: [106.296962, 38.58361056], chunengrongliang: 28.72293549 }
]
function echarts_zuo1_1(name) {
    var container = document.getElementById('场站能源需求');
    container.style.padding = fontSize(0.15) + "px";
    var data = dataPoints.find(function (item) {
        return item.name === name;
    });

    // 检查是否找到了匹配的数据
    if (data) {
        // 使用找到的数据更新页面内容
        container.innerHTML = `
            <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.5rem;">场站停车数量：${data.tingkaoshuliang} 辆</div>
            <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.5rem;">场站充电桩数：${data.zuixiaogeshu} 个</div>
            <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.5rem;">光伏装机容量：${data.zhuangjirongliang} kW</div>
            <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.5rem;">储能容量：${data.chunengrongliang} kWh</div>
        `;
    } else {
        // 如果未找到匹配的数据，可以显示一条错误消息或者其他处理方式
        container.innerHTML = "未找到与名称匹配的数据";
        alert("未找到与名称匹配的数据");
    }
    window.addEventListener("resize", function () {
        myChart.resize();
    });

}
function echarts_you1_1(name) {
    var container = document.getElementById('场站能源供给');
    container.style.padding = fontSize(0.15) + "px";
    var data = dataPoints.find(function (item) {
        return item.name === name;
    });

    // 检查是否找到了匹配的数据
    if (data) {
        // 使用找到的数据更新页面内容
        //            <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.5rem;">经济：${data.zuixiaogeshu}</div>
        container.innerHTML = `
            <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.5rem;">该场站碳减排：${data.tingkaoshuliang} </div>
            <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.5rem;">电网负荷：${data.zuixiaogeshu}</div>
            <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.5rem;">光伏利用率：${data.zuixiaogeshu}</div>
            `;
    } else {
        // 如果未找到匹配的数据，可以显示一条错误消息或者其他处理方式
        container.innerHTML = "未找到与名称匹配的数据";
        alert("未找到与名称匹配的数据");
    }
    window.addEventListener("resize", function () {
        myChart.resize();
    });

}

function echarts_you2() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('场站日光伏发电量分布'));

    option = {
        //  backgroundColor: '#00265f',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },

        grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '范围',
            data: ['0-2000 kWh', '2000-4000 kWh', '4000-6000 kWh', '6000-8000 kWh', '8000-20000 kWh'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                    type: "solid"
                },
            },

            axisTick: {
                show: false,
            },
            axisLabel: {
                interval: 0,

                // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
        }],
        yAxis: [{
            type: 'value',
            name: 'KWH',
            axisLabel: {
                //formatter: '{value} %'

                show: true,
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,1	)",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                }
            }
        }],
        series: [{
            type: 'bar',
            data: [21, 11, 1, 2, 3],
            barWidth: '35%', //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
                normal: {
                    color: '#2f89cf',
                    opacity: 1,
                    barBorderRadius: 5,
                }
            }
        }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
function echarts_you3() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart6'));

    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 1)',
        }
    };
    var placeHolderStyle = {
        normal: {
            color: 'rgba(255,255,255,.05)',
            label: { show: false, },
            labelLine: { show: false }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    option = {
        color: ['#52F6DD', '#EC9122', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
        tooltip: {
            show: true,
            formatter: function (params) {
                return params.seriesName + ' : ' + params.value + ' kWh';
            }
        },
        legend: {
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
            bottom: '3%',
            data: ['海吉星物流中心', '银川市公共交通公司运营一分公司', '迎宾广场', '北门公交车场', '掌政公交首末站'],
            textStyle: {
                color: 'rgba(255,255,255,.6)',
            }
        },

        series: [
            {
                name: '海吉星物流中心',
                type: 'pie',
                clockWise: false,
                center: ['50%', '42%'],
                radius: ['59%', '70%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: [{
                    value: 18888,
                    name: '01'
                }, {
                    value: 0,
                    name: 'invisible',
                    tooltip: { show: false },
                    itemStyle: placeHolderStyle
                }]
            },
            {
                name: '银川市公共交通公司运营一分公司',
                type: 'pie',
                clockWise: false,
                center: ['50%', '42%'],
                radius: ['49%', '60%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: [{
                    value: 8739,
                    name: '02'
                }, {
                    value: 10149,
                    name: 'invisible',
                    tooltip: { show: false },
                    itemStyle: placeHolderStyle
                }]
            },
            {
                name: '迎宾广场',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['39%', '50%'],
                itemStyle: dataStyle,
                data: [{
                    value: 8206,
                    name: '03'
                }, {
                    value: 10682,
                    name: 'invisible',
                    tooltip: { show: true },
                    itemStyle: placeHolderStyle
                }]
            },
            {
                name: '北门公交车场',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['29%', '40%'],
                itemStyle: dataStyle,
                data: [{
                    value: 7941,
                    name: '04'
                }, {
                    value: 10947,
                    name: 'invisible',
                    tooltip: { show: false },
                    itemStyle: placeHolderStyle
                }]
            },
            {
                name: '掌政公交首末站',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['20%', '30%'],
                itemStyle: dataStyle,
                data: [{
                    value: 6442,
                    name: '05'
                }, {
                    value: 12446,
                    name: 'invisible',
                    tooltip: { show: false },
                    itemStyle: placeHolderStyle
                }]
            },]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

function echarts_4_1(name) {
    // 基于准备好的dom，初始化echarts实例

    var myChart = echarts.init(document.getElementById('场站日光伏发电量分布'));
    var data1 = datachun.find(function (item) {
        return item.name === name;
    });
    var data2 = dataxia.find(function (item) {
        return item.name === name;
    });
    var data3 = dataqiu.find(function (item) {
        return item.name === name;
    });
    var data4 = datadong.find(function (item) {
        return item.name === name;
    });
    var datachun1 = [];
    var dataxia1 = [];
    var dataqiu1 = [];
    var datadong1 = [];
    for (var i = 0; i <= 24; i++) {
        datachun1.push(data1[i]);
    }
    for (var i = 0; i <= 24; i++) {
        dataxia1.push(data2[i]);
    }
    for (var i = 0; i <= 24; i++) {
        dataqiu1.push(data3[i]);
    }
    for (var i = 0; i <= 24; i++) {
        datadong1.push(data4[i]);
    }
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#dddc6b'
                }
            }
        },
        legend: {
            top: '0%',
            data: ['春', '夏', '秋', '冬'],
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12',
            }
        },
        grid: {
            left: '10',
            top: '30',
            right: '10',
            bottom: '10',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                },
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.2)'
                }

            },

            data: ['1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时', '24时']

        }, {

            axisPointer: { show: false },
            axisLine: { show: false },
            position: 'bottom',
            offset: 20,
        }],

        yAxis: [{
            name: 'KWH',
            type: 'value',
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,1)'
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                },
            },

            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            }
        }],
        series: [
            {
                name: '春',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {

                    normal: {
                        color: '#0184d5',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(1, 132, 213, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(1, 132, 213, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0184d5',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: datachun1

            },
            {
                name: '夏',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {

                    normal: {
                        color: '#00d887',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#00d887',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: dataxia1

            },
            {
                name: '秋',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {

                    normal: {
                        color: '#E6E623',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#E6E623',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: dataqiu1

            },
            {
                name: '冬',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {

                    normal: {
                        color: '#EA4E27',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#EA4E27',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: datadong1

            }
        ]

    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
function echarts_2_1(num) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('充电需求排名'));
    var filteredData = dataxvqiu.filter(function (item) {
        return item.id === num;
    });

    // 提取功率值
    var powerNoAI = filteredData.map(function (item) {
        return item.power_no_ai;
    });
    var powerAI = filteredData.map(function (item) {
        return item.power_air;
    });

    // 使用原始时间数组
    var times = filteredData.map(function (item) {
        return item.time;
    });

    option = {
        tooltip: {

            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#dddc6b'
                }
            }
        },
        legend: {
            top: '0%',
            data: ['无空调', '有空调'],
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12',
            }
        },
        grid: {
            left: '10',
            top: '30',
            right: '10',
            bottom: '10',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                },
                // 使用 formatter 来自定义 x 轴标签的显示
                formatter: function (value) {
                    // 将原始时间值转换为小时数，这里假设时间间隔为1小时
                    return Math.floor((value - 1) / 60) + 1 + '时';
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.2)'
                }
            },
            data: times // 这里仍然使用原始的时间数组
        }, {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: 'bottom',
            offset: 20,
        }],

        yAxis: [{
            name: 'W',
            type: 'value',
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,1)'
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                },
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            }
        }],
        series: [{
            name: '无空调',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#0184d5',
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(1, 132, 213, 0.4)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(1, 132, 213, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
            },
            itemStyle: {
                normal: {
                    color: '#0184d5',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                }
            },
            data: powerNoAI
        },
        {
            name: '有空调',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#00d887',
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 216, 135, 0.4)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 216, 135, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
            },
            itemStyle: {
                normal: {
                    color: '#00d887',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                }
            },
            data: powerAI
        }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
function echarts_3_1(num) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb1'));
    var filteredData = datagongji.filter(function (item) {
        return item.id === num;
    });

    // 提取功率值
    var gongji = filteredData.map(function (item) {
        return item.gongji;
    });

    // 使用原始时间数组
    var times = filteredData.map(function (item) {
        return item.time;
    });

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#dddc6b'
                }
            }
        },
        legend: {
            top: '0%',
            data: ['充电需求'],
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12',
            }
        },
        grid: {
            left: '5%', // 调整左侧边距
            top: '10%', // 调整顶部边距
            right: '5%', // 调整右侧边距
            bottom: '15%', // 调整底部边距
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                },
                // 使用 formatter 来自定义 x 轴标签的显示
                formatter: function (value) {
                    // 将原始时间值转换为小时数，这里假设时间间隔为1小时
                    return Math.floor((value - 1) / 60) + '时';
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.2)'
                }
            },
            data: times // 这里仍然使用原始的时间数组
        }, {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: 'bottom',
            offset: 20,
        }],

        yAxis: [{
            name: 'W',
            type: 'value',
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,1)'
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                },
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            }
        }],
        series: [{
            name: '充电需求',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#0184d5',
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(1, 132, 213, 0.4)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(1, 132, 213, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
            },
            itemStyle: {
                normal: {
                    color: '#0184d5',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                }
            },
            data: gongji
        }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
function echarts_6_1(num) {
    // 假设您的数据存储在变量datayueguangfu中
    var myChart = echarts.init(document.getElementById('echart6'));
    var filteredData = datayueguangfu.filter(function (item) {
        return item.id === num;
    });
    var xAxisData = filteredData.map(function (item) {
        return item.month + '月'; // 在月份后面添加"月"字
    });

    // 使用原始时间数组
    var yAxisData = filteredData.map(function (item) {
        return item.zong;
    });
    option = {
        legend: { // 标注位置
            orient: 'vertical',
            x: 'right',
            y: 'center',
            textStyle: {
                color: 'white' // 设置图例文字颜色为红色
            }
        },


        xAxis: { // X轴的设置
            type: 'category', // 不连续的字符串
            axisLine: { // X轴样式设置
                lineStyle: {
                    type: 'solid',
                    color: 'white', // 线的颜色
                    width: 1 // 坐标线的宽度
                }

            },
            data: xAxisData // X轴的数据
        },
        yAxis: { // Y轴的设置

            name: 'KWH',
            type: 'value', // 设置y轴为数值类型
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,1)'
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                },
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            }
        },
        series: [ // 每个形状的设置
            {
                type: 'bar', // 柱状
                barWidth: fontSize(0.3), // 每簇之间的距离
                color: '#6495ED', // 柱状的颜色
                label: { // 提示的设置
                    normal: {
                        show: false,
                        position: 'top'
                    }
                },
                data: yAxisData // Y轴的数据
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}