import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from './../views/layout/index'
import layoutRight from './../views/layout/right/right'
// import mapTemp from './../views/map/index'
import leftPanel from './../views/leftPanel/index'
// 标识点
import identificPointList from './../views/identificPoint/list'
import identificPointQuery from './../views/identificPoint/query'
import identificPointResult from './../views/identificPoint/result'
import identificPointDetail from './../views/identificPoint/detail'
import identificPointEdit from './../views/identificPoint/edit'
// 收费站
import tollStationList from './../views/tollStation/list'
import tollStationQuery from './../views/tollStation/query'
import tollStationResult from './../views/tollStation/result'
import tollStationDetail from './../views/tollStation/detail'
import tollStationEdit from './../views/tollStation/edit'
// 收费站广场
import tollStationSquareList from './../views/tollStationSquare/list'
import tollStationSquareQuery from './../views/tollStationSquare/query'
import tollStationSquareResult from './../views/tollStationSquare/result'
import tollStationSquareEdit from './../views/tollStationSquare/edit'
// 收费站车道
import tollStationLaneList from './../views/tollStationLane/list'
import tollStationLaneQuery from './../views/tollStationLane/query'
import tollStationLaneResult from './../views/tollStationLane/result'
import tollStationLaneDetail from './../views/tollStationLane/detail'
import tollStationLaneEdit from './../views/tollStationLane/edit'
// ETC客服网点
import ETCServerList from './../views/ETCServer/list'
import ETCServerQuery from './../views/ETCServer/query'
import ETCServerResult from './../views/ETCServer/result'
import ETCServerDetail from './../views/ETCServer/detail'
import ETCServerEdit from './../views/ETCServer/edit'
// 服务区
import serviceAreaList from './../views/serviceArea/list'
import serviceAreaQuery from './../views/serviceArea/query'
import serviceAreaResult from './../views/serviceArea/result'
import serviceAreaEdit from './../views/serviceArea/edit'
// 加油站
import gasStationList from './../views/gasStation/list'
import gasStationQuery from './../views/gasStation/query'
import gasStationResult from './../views/gasStation/result'
import gasStationEdit from './../views/gasStation/edit'
// 停车场
import parkList from './../views/park/list'
import parkQuery from './../views/park/query'
import parkResult from './../views/park/result'
import parkEdit from './../views/park/edit'
// 统计分析
import statisticAny from './../views/statisticAny/index'
// 省界收费站统计
import provinceStationStatistic from './../views/provinceStationStatistic/index'
// 权限管理-角色管理
import roleManagement from './../views/roleManagement'
// 权限管理-用户管理
import userManagement from './../views/userManagement'
// 无权限页面
import notFound from './../views/notFound/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: layout,
    children: [
      {
        path: '/layoutRight',
        name: '/layoutRight',
        component: layoutRight,
        children: [
          {
            path: '/identificPointList',
            name: 'identificPointList',
            components: {
              content: identificPointList
            },
            meta: {
              index: '0300',
              title: '核实采集-标识点列表',
              isShowMap: false
            }
          },
          {
            path: '/tollStationList',
            name: 'tollStationList',
            components: {
              content: tollStationList
            },
            meta: {
              index: '0301',
              title: '核实采集-收费站列表',
              isShowMap: false
            }
          },
          {
            path: '/tollStationSquareList',
            name: 'tollStationSquareList',
            components: {
              content: tollStationSquareList
            },
            meta: {
              index: '0302',
              title: '核实采集-收费广场列表',
              isShowMap: false
            }
          },
          {
            path: '/tollStationLaneList',
            name: 'tollStationLaneList',
            components: {
              content: tollStationLaneList
            },
            meta: {
              index: '0303',
              title: '核实采集-收费车道列表',
              isShowMap: false
            }
          },
          {
            path: '/ETCServerList',
            name: 'ETCServerList',
            components: {
              content: ETCServerList
            },
            meta: {
              index: '0304',
              title: '核实采集-ETC客服网点列表',
              isShowMap: false
            }
          },
          {
            path: '/serviceAreaList',
            name: 'serviceAreaList',
            components: {
              content: serviceAreaList
            },
            meta: {
              index: '0305',
              title: '核实采集-服务区列表',
              isShowMap: false
            }
          },
          {
            path: '/gasStationList',
            name: 'gasStationList',
            components: {
              content: gasStationList
            },
            meta: {
              index: '0306',
              title: '核实采集-加油站列表',
              isShowMap: false
            }
          },
          {
            path: '/parkList',
            name: 'parkList',
            components: {
              content: parkList
            },
            meta: {
              index: '0307',
              title: '核实采集-停车场列表',
              isShowMap: false
            }
          },
          {
            path: '/identificPointList',
            name: 'identificPointList',
            components: {
              content: identificPointList
            },
            meta: {
              index: '0300',
              title: '核实采集-标识点列表',
              isShowMap: false
            }
          },
          {
            path: '/roleManagement',
            name: 'roleManagement',
            components: {
              content: roleManagement
            },
            meta: {
              index: '0402',
              title: '权限管理-角色管理',
              isShowMap: false
            }
          },
          {
            path: '/userManagement',
            name: 'userManagement',
            components: {
              content: userManagement
            },
            meta: {
              index: '0401',
              title: '权限管理-用户管理',
              isShowMap: false
            }
          },
          {
            path: '/leftPanel',
            name: 'leftPanel',
            components: {
              content: leftPanel
            },
            children: [
              {
                path: '/identificPoint/query',
                name: 'identificPointQuery',
                component: identificPointQuery,
                meta: {
                  index: '0200',
                  title: '查询-标识点查询表单',
                  isShowMap: true
                }
              },
              {
                path: '/identificPoint/result',
                name: 'identificPointResult',
                component: identificPointResult,
                meta: {
                  index: '0200',
                  title: '查询-标识点结果列表',
                  isShowMap: true
                }
              },
              {
                path: '/identificPoint/detail:id?',
                name: 'identificPointDetail',
                component: identificPointDetail,
                meta: {
                  index: '0200',
                  title: '查询-标识点详情',
                  isShowMap: true
                }
              },
              {
                path: '/identificPoint/edit:id?',
                name: 'identificPointEdit',
                component: identificPointEdit,
                meta: {
                  index: '0200',
                  title: '核实采集-标识点编辑',
                  isShowMap: true
                }
              },
              {
                path: '/tollStation/query',
                name: 'tollStationQuery',
                component: tollStationQuery,
                meta: {
                  index: '0201',
                  title: '查询-收费站查询表单',
                  isShowMap: true
                }
              },
              {
                path: '/tollStation/result',
                name: 'tollStationResult',
                component: tollStationResult,
                meta: {
                  index: '0201',
                  title: '查询-收费站结果列表',
                  isShowMap: true
                }
              },
              {
                path: '/tollStation/detail:id?',
                name: 'tollStationDetail',
                component: tollStationDetail,
                meta: {
                  index: '0201',
                  title: '查询-收费站详情',
                  isShowMap: true
                }
              },
              {
                path: '/tollStation/edit:id?',
                name: 'tollStationEdit',
                component: tollStationEdit,
                meta: {
                  index: '0301',
                  title: '核实采集-收费站编辑',
                  isShowMap: true
                }
              },
              {
                path: '/tollStationSquare/query',
                name: 'tollStationSquareQuery',
                component: tollStationSquareQuery,
                meta: {
                  index: '0202',
                  title: '查询-收费广场查询表单',
                  isShowMap: true
                }
              },
              {
                path: '/tollStationSquare/result',
                name: 'tollStationSquareResult',
                component: tollStationSquareResult,
                meta: {
                  index: '0202',
                  title: '查询-收费广场结果列表',
                  isShowMap: true
                }
              },
              {
                path: '/tollStationSquare/edit/:id',
                name: 'tollStationSquareEdit',
                component: tollStationSquareEdit,
                meta: {
                  index: '0302',
                  title: '核实采集-收费广场编辑',
                  isShowMap: true
                }
              },
              {
                path: '/tollStationLane/query',
                name: 'tollStationLaneQuery',
                component: tollStationLaneQuery,
                meta: {
                  index: '0203',
                  title: '查询-收费车道查询表单',
                  isShowMap: true
                }
              },
              {
                path: '/tollStationLane/result',
                name: 'tollStationLaneResult',
                component: tollStationLaneResult,
                meta: {
                  index: '0203',
                  title: '查询-收费车道结果列表',
                  isShowMap: true
                }
              },
              {
                path: '/tollStationLane/detail:id?',
                name: 'tollStationLaneDetail',
                component: tollStationLaneDetail,
                meta: {
                  index: '0203',
                  title: '查询-收费车道详情',
                  isShowMap: true
                }
              },
              {
                path: '/tollStationLane/edit/:id',
                name: 'tollStationLaneEdit',
                component: tollStationLaneEdit,
                meta: {
                  index: '0303',
                  title: '核实编辑-收费车道编辑',
                  isShowMap: true
                }
              },
              {
                path: '/ETCServer/query',
                name: 'ETCServerQuery',
                component: ETCServerQuery,
                meta: {
                  index: '0204',
                  title: '查询-etc服务网点查询表单',
                  isShowMap: true
                }
              },
              {
                path: '/ETCServer/result',
                name: 'ETCServerResult',
                component: ETCServerResult,
                meta: {
                  index: '0204',
                  title: '查询-etc服务网点结果列表',
                  isShowMap: true
                }
              },
              {
                path: '/ETCServer/detail:id?',
                name: 'ETCServerDetail',
                component: ETCServerDetail,
                meta: {
                  index: '0204',
                  title: '查询-etc服务网点详情',
                  isShowMap: true
                }
              },
              {
                path: '/ETCServer/edit/:id',
                name: 'ETCServerEdit',
                component: ETCServerEdit,
                meta: {
                  index: '0304',
                  title: '核实采集-etc服务网点编辑',
                  isShowMap: true
                }
              },
              {
                path: '/serviceArea/query',
                name: 'serviceAreaQuery',
                component: serviceAreaQuery,
                meta: {
                  index: '0205',
                  title: '查询-服务区查询表单',
                  isShowMap: true
                }
              },
              {
                path: '/serviceArea/result',
                name: 'serviceAreaResult',
                component: serviceAreaResult,
                meta: {
                  index: '0205',
                  title: '查询-服务区结果列表',
                  isShowMap: true
                }
              },
              {
                path: '/serviceArea/edit/:id',
                name: 'serviceAreaEdit',
                component: serviceAreaEdit,
                meta: {
                  index: '0305',
                  title: '核实采集-服务区编辑',
                  isShowMap: true
                }
              },
              {
                path: '/gasStation/query',
                name: 'gasStationQuery',
                component: gasStationQuery,
                meta: {
                  index: '0206',
                  title: '查询-加油站查询表单',
                  isShowMap: true
                }
              },
              {
                path: '/gasStation/result',
                name: 'gasStationResult',
                component: gasStationResult,
                meta: {
                  index: '0206',
                  title: '查询-加油站结果列表',
                  isShowMap: true
                }
              },
              {
                path: '/gasStation/edit/:id',
                name: 'gasStationEdit',
                component: gasStationEdit,
                meta: {
                  index: '0306',
                  title: '核实采集-加油站编辑',
                  isShowMap: true
                }
              },
              {
                path: '/park/query',
                name: 'parkQuery',
                component: parkQuery,
                meta: {
                  index: '0207',
                  title: '查询-停车场查询表单',
                  isShowMap: true
                }
              },
              {
                path: '/park/result',
                name: 'parkResult',
                component: parkResult,
                meta: {
                  index: '0207',
                  title: '查询-停车场结果列表',
                  isShowMap: true
                }
              },
              {
                path: '/park/edit/:id',
                name: 'parkEdit',
                component: parkEdit,
                meta: {
                  index: '0307',
                  title: '核实采集-停车场编辑',
                  isShowMap: true
                }
              }
            ]},
          {
            path: '/statisticAny',
            name: 'statisticAny',
            components: {
              content: statisticAny
            },
            meta: {
              index: '0101',
              title: '统计-基础数据统计',
              isShowMap: false
            }
          },
          {
            path: '/provinceStationStatistic',
            name: 'provinceStationStatistic',
            components: {
              content: provinceStationStatistic
            },
            meta: {
              index: '0102',
              title: '统计-省界收费站统计',
              isShowMap: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/index'
  },
  {
    path: '/notFound',
    component: notFound,
    name: 'notFound'
  }
]

const router = new VueRouter({
  routes: routes
})

export default router
