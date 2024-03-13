echarts_zuo1();
echarts_zuo2();
echarts_you1()
echarts_zuo31();
echarts_you2();
echarts_you3();
function echarts_zuo1() {
    var container = document.getElementById('场站能源需求');
    container.style.padding = fontSize(0.15) + "px";
    container.innerHTML = `
    <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">公交车总数：1652</div>
    <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">公交线路总数：161</div>
    <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">年总能耗（估）：431126（KWH）</div>
    `;
    window.addEventListener("resize", function () {
        myChart.resize();
    });

}
function echarts_zuo1_1(name) {
    var container = document.getElementById('场站能源需求');
    container.style.padding = fontSize(0.15) + "px";
    var data = datapoints.find(function (item) {
        return item.name === name;
    });

    // 检查是否找到了匹配的数据
    if (data) {
        // 使用找到的数据更新页面内容
        container.innerHTML = `
            <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">场站停车数量：${data.tingcheshuliang}</div>
            <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">场站充电桩数：${data.chongdianzhuangshu}</div>
            <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">光伏装机容量：${data.guangfuzhuangjirongliang}</div>
            <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">储能容量：${data.chunengrongliang}</div>
        `;
    } else {
        // 如果未找到匹配的数据，可以显示一条错误消息或者其他处理方式
        container.innerHTML = "未找到与名称匹配的数据";
    }
    window.addEventListener("resize", function () {
        myChart.resize();
    });

}
function echarts_zuo2() {
    // 初始化echarts实例
    var myChart = echarts.init(document.getElementById('充电需求排名'));
    var data = guangfudata;
    var colors = ['#ff7f0e', '#1f77b4'];
    // 根据数据排序
    data.sort(function (a, b) {
        return a[1] - b[1];
    });
    var data2 = data.map(function (item) {
        return item[1];
    });
    var data1 = data.map(function (item) {
        return item[2];
    });
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        // grid配置
        grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        // x轴配置
        xAxis: [{
            name: 'KWH',
            type: 'value',
            show: false,
            axisTick: { show: false },
            splitLine: { show: false }
        }],
        // y轴配置
        yAxis: [{

            type: 'category',
            data: data.map(function (item) {
                return item[0]; // 场站名称作为 y 轴数据
            }),
            axisLabel: {
                fontSize: 15,
                color: 'white'
            },
            axisTick: { show: false },
            axisLine: {
                show: true,
                lineStyle: { color: "rgba(255,255,255,.1)", width: 1, type: "solid" },
            },
            splitLine: { lineStyle: { color: "rgba(255,255,255,.1)" } }
        }],
        series: [{
            name: '有空调',
            type: 'bar',
            stack: '有空调',
            data: data1,
            //label: { show: true, position: 'inside', formatter: '{c} kW', fontSize: 15, color: 'white' },
            itemStyle: { color: colors[0] }
        },
        {
            name: '无空调',
            type: 'bar',
            stack: '无空调',
            data: data2,
            // label: { show: true, position: 'insideBottom', formatter: '{c} kW', fontSize: 15, color: 'white' },
            itemStyle: { color: colors[1] }
        }
        ]
    };

    // 显示图例
    option.legend = {
        data: ['有空调', '无空调'],
        textStyle: { color: 'white' },
        orient: 'vertical',
        right: 10,
        top: 12 * fontSize(0.15)
    };
    // 使用配置项显示图表
    myChart.setOption(option);

    // 添加窗口大小变化的监听事件
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

function echarts_zuo31() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb1'));
    option = {
        legend: {//标注位置
            orient: 'vertical',
            x: 'right',
            y: 'center',
            textStyle: {
                color: 'white' // 设置图例文字颜色为红色
            }
        },
        tooltip: {},//提示线
        dataset: {//数据设置
            source: [
                ['product', '有空调', '无空调'],
                ['0-5000', 19, 29],
                ['5001-10000', 10, 7],
                ['10001-15000', 4, 2],
                ['15001-20000', 4, 1],
                ['20001-', 2, 0]
            ]
        },
        xAxis: {//X轴的设置
            type: 'category',//不连续的字符串
            axisLine: {// X轴样式设置
                lineStyle: {
                    type: 'solid',
                    color: 'white',//线的颜色
                    width: '1'//坐标线的宽度
                }
            },
        },
        yAxis: {//Y轴的设置

            show: false
        },
        series: [//每个形状的设置
            {
                type: 'bar',//柱状
                barWidth: fontSize(0.3),// 每簇之间的距离
                color: '#6495ED',//柱状的颜色
                label: {//提示的设置
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },

            },
            {
                type: 'bar',
                color: '#CD5C5C',
                barWidth: fontSize(0.3),
                barGap: '0%',//每簇中的每个柱状的距离 String形式
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
            }

        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
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
            name: 'KWH',
            type: 'category',
            name: '范围',
            data: ['0-1000', '1000-3000', '3000-5000', '5000-7000',],
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
                    color: "rgba(255,255,255,.1	)",
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
            data: [2, 3, 3, 9, 15, 12, 6, 4, 6, 7, 4, 10],
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

function echarts_you1() {
    var container = document.getElementById('场站能源供给');

    container.style.padding = fontSize(0.15) + "px";
    container.innerHTML = `
        <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">装机容量：18.23858（MW）</div>
        <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">年光伏发电总量：33019439（KWH）</div>
        <div class="item" style="font-size: 0.25rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">储能容量：XX</div>
        `;
    window.addEventListener("resize", function () {
        myChart.resize();
    });

}

/*
function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));

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
    top:'0%',
        data:['安卓','IOS'],
                textStyle: {
           color: 'rgba(255,255,255,.5)',
            fontSize:'12',
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
axisLabel:  {
                textStyle: {
                        color: "rgba(255,255,255,.6)",
                    fontSize:12,
                },
            },
        axisLine: {
            lineStyle: { 
                color: 'rgba(255,255,255,.2)'
            }

        },

   data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

    }, {

        axisPointer: {show: false},
        axisLine: {  show: false},
        position: 'bottom',
        offset: 20,

       

    }],

    yAxis: [{
        type: 'value',
        axisTick: {show: false},
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
       axisLabel:  {
                textStyle: {
                        color: "rgba(255,255,255,.6)",
                    fontSize:12,
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
        name: '安卓',
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
        data: [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

    }, 
{
        name: 'IOS',
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
        data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

    }, 
	
         ]

};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    function echarts_32() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb2'));
        option = {
 
            title: [{
                text: '职业分布',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '16'
                }
 
            }],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position: function (p) {   //其中p为当前鼠标的位置
                    return [p[0] + 10, p[1] - 10];
                }
            },
            legend: {
 
                top: '70%',
                itemWidth: 10,
                itemHeight: 10,
                data: ['电子商务', '教育', 'IT/互联网', '金融', '学生', '其他'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '12',
                }
            },
            series: [
                {
                    name: '年龄分布',
                    type: 'pie',
                    center: ['50%', '42%'],
                    radius: ['40%', '60%'],
                    color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                    label: { show: false },
                    labelLine: { show: false },
                    data: [
                        { value: 5, name: '电子商务' },
                        { value: 1, name: '教育' },
                        { value: 6, name: 'IT/互联网' },
                        { value: 2, name: '金融' },
                        { value: 1, name: '学生' },
                        { value: 1, name: '其他' },
                    ]
                }
            ]
        };
 
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function echarts_33() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb3'));
        option = {
            title: [{
                text: '兴趣分布',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '16'
                }
 
            }],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position: function (p) {   //其中p为当前鼠标的位置
                    return [p[0] + 10, p[1] - 10];
                }
            },
            legend: {
                top: '70%',
                itemWidth: 10,
                itemHeight: 10,
                data: ['汽车', '旅游', '财经', '教育', '软件', '其他'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '12',
                }
            },
            series: [
                {
                    name: '兴趣分布',
                    type: 'pie',
                    center: ['50%', '42%'],
                    radius: ['40%', '60%'],
                    color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                    label: { show: false },
                    labelLine: { show: false },
                    data: [
                        { value: 2, name: '汽车' },
                        { value: 3, name: '旅游' },
                        { value: 1, name: '财经' },
                        { value: 4, name: '教育' },
                        { value: 8, name: '软件' },
                        { value: 1, name: '其他' },
                    ]
                }
            ]
        };
 
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
*/




















/*
function echarts_1() {
    var container = document.getElementById('场站能源需求');
    container.innerHTML = `
    <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">公交车总数：XX</div>
    <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">公交线路总数：XX</div>
    <div class="item" style="font-size: 0.3rem; color: rgba(33, 155, 208, 1) ;line-height: 0.7rem;">年总能耗（估）：XX</div>
    `;
    window.addEventListener("resize", function () {
        myChart.resize();
    });

}

function echarts_2() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('充电需求排名（有空调）'));
    var data = guangfudata;
    data.sort(function (a, b) {
        return a[1] - b[1];
    });
    option = {
        //  backgroundColor: '#00265f',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: [{

            left: 'center',
            type: 'value',
            axisTick: { // 去除x轴刻度
                show: false
            },
            splitLine: { // 去除x轴分割线
                show: false
            }
        }],
        yAxis: [{
            type: 'category',
            data: data.map(function (item) {
                return item[0]; // 文件名作为 y 轴数据
            }),
            axisLabel: {
                fontSize: 15, // 设置标签文字大小
                color: 'white', // 设置标签文字颜色
                lineStyle: {
                    color: 'transparent' // 去除 x 轴线颜色
                }
            },

            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,.1	)",
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
            data: data.map(function (item) {
                return parseFloat(item[1]); // 光伏发电量作为柱状图数据
            }),
            label: {
                show: true,
                position: 'right',
                formatter: '{c} kW', // 设置数据标签显示格式
                fontSize: fontSize(0.08), // 设置数据标签文字大小
                color: 'white' // 设置数据标签文字颜色
            },
            itemStyle: {
                color: 'hsla(221, 75%, 32%, 1)' // 设置柱的颜色
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}*/