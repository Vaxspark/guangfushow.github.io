/*

$(function () {
    initChart();
    let publicUrl = 'https://geo.datav.aliyun.com/areas_v2/bound/';

    async function initChart() {
        let chart = echarts.init(document.getElementById('map_1'));
        let alladcode = await getGeoJson('all.json')
        let chinaGeoJson = await getGeoJson('100000_full.json')
        initEcharts(chinaGeoJson, '全国', chart, alladcode)
    }
    //echarts绘图
    function initEcharts(geoJson, name, chart, alladcode) {
        echarts.registerMap(name, geoJson);
        let option = {
            title: {
                text: name,
                left: 'center'
            },
            series: [{
                type: 'map',
                map: name,
                itemStyle: {
                    areaColor: '#1890ff'
                }
            }]
        }
        chart.setOption(option)
        // 解绑click事件
        chart.off("click");
        //给地图添加监听事件
        chart.on('click', params => {
            let clickRegionCode = alladcode.filter(areaJson => areaJson.name === params.name)[0].adcode;
            getGeoJson(clickRegionCode + '_full.json').then(regionGeoJson => initEcharts(regionGeoJson, params.name, chart, alladcode))
                .catch(err => {
                    getGeoJson('100000_full.json').then(
                        chinaGeoJson => initEcharts(chinaGeoJson, '全国', chart, alladcode)
                    )

                })
        })
    }
    //获取地图json数据
    async function getGeoJson(jsonName) {
        return await $.get(publicUrl + jsonName)
    }

})
*/
let publicUrl = 'https://geo.datav.aliyun.com/areas_v2/bound/';

async function initChart() {
    let chart = echarts.init(document.getElementById('map_1'));
    let alladcode = await getGeoJson('all.json')
    let beijingGeoJson = await getGeoJson('640100_full.json')
    initEcharts(beijingGeoJson, '', chart, alladcode)
    generateBarChart(guangfudata);
}
initChart();

//echarts绘图
function initEcharts(geoJson, name, chart, alladcode) {
    echarts.registerMap(name, geoJson);
    let option = {
        title: {
            text: name,
            left: 'center'
        },
        series: [{
            type: 'map',
            map: name,
            itemStyle: {
                areaColor: '#1890ff'
            }
        }]
    }
    chart.setOption(option)
    // 解绑click事件
    chart.off("click");
    //给地图添加监听事件
    chart.on('click', params => {
        let clickRegionCode = alladcode.filter(areaJson => areaJson.name === params.name)[0].adcode;
        getGeoJson(clickRegionCode + '_full.json').then(regionGeoJson => initEcharts(regionGeoJson, params.name, chart, alladcode))
            .catch(err => {
                getGeoJson('100000_full.json').then(
                    chinaGeoJson => initEcharts(chinaGeoJson, '全国', chart, alladcode)
                )

            })
    })
}
//获取地图json数据
async function getGeoJson(jsonName) {
    return await $.get(publicUrl + jsonName)
}
