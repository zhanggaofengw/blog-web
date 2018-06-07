<template>
  <div class="right-container visit" ref="rightContainer">
    <div id="main"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
  import PageQueryHeader from '../../base/page-query-header/page-query-header.vue'
  import 'echarts/map/js/china.js'
  import {queryAll} from '../../common/js/server'
  export default {
    mixins: [marginMixin],
    data () {
      return {
        visitList: [],
        data: [],
        geoCoordMap: {}
      }
    },
    created() {
      this.queryVisit()
    },
    methods: {
      drawPie(id){
        this.charts = this.echarts.init(document.getElementById(id))
        this.max = this.data.sort(function (a, b) {
          return b.value - a.value
        })[0].value
        let convertData = (data) => {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = this.geoCoordMap[data[i].cid];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              })
            }
          }
          console.log(res)
          return res
        }
        this.charts.setOption({
          baseOption: {
            backgroundColor: '#404a59',
            title: {
              text: '访问统计',
              left: 'center',
              textStyle: {
                color: '#fff'
              }
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              y: 'bottom',
              x: 'right',
              data: ['访问量'],
              textStyle: {
                color: '#fff'
              }
            },
            geo: {
              map: 'china',
              label: {
                emphasis: {
                  show: false
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#323c48',
                  borderColor: '#111'
                },
                emphasis: {
                  areaColor: '#2a333d'
                }
              }
            },
            series: [
              {
                name: '访问量',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(this.data),
                symbolSize: (val) => {
                  return val[2] / this.max * 15
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                tooltip: {
                  formatter: (params) => {
                    let name = params.name
                    let value = params.value[2]
                    return `访问量<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddb926;"></span>${name}: ${value}`
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ddb926'
                  }
                }
              },
              {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(this.data.sort(function (a, b) {
                  return b.value - a.value
                }).slice(0, 5)),
                symbolSize: (val) => {
                  return val[2] / this.max * 15
                },
                showEffectOn: 'render',
                rippleEffect: {
                  brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },
                tooltip: {
                  formatter: (params) => {
                    let name = params.name
                    let value = params.value[2]
                    return `Top 5<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddb926;"></span>${name}: ${value}`
                  }
                },
                zlevel: 1
              }
            ]
          },
          media: [
            {
              option: {
                geo: {
                  width: 400,
                  height: 400
                }
              }
            }
          ]
        })
      },
      queryVisit() {
        let url = '/visit/query'
        queryAll(url, this).then((response) => {
          if (response) {
            this.visitList = response.visits
            this.visitList.forEach((item) => {
              this.data.push(
                {name: item.cname, cid: item.cid, value: item.visitCount}
              )
              this.geoCoordMap[item.cid] = [item.lng, item.lat]
            })
            this.drawPie('main')
          }
        })
      }
    },
    components: {
      PageQueryHeader
    }
  }
</script>

<style>
  .visit {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .visit #main{
    height: 100%;
  }
</style>
