import axios from 'axios'

const baseURL = config.service.baseUrl
const ARCGIS_URL = config.service.xzqhUrl
const defaults = {
  baseURL: baseURL,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
}

Object.assign(axios.defaults, defaults)
/*
* 标识点
* */
// 列表查询
export const loadIdentificPointList = (params) => {
  return axios.post(`pathidentify/list`, params)
}
// 编辑
export const editIdentificPoint = (params) => {
  return axios.post(`pathidentify/updatePathidentify`, params)
}
// 删除
export const removeIdentificPoint = (params) => {
  return axios.post(`pathidentify/updatePathidentify`, params)
}
// 详情
export const queryIdentificPointDetailById = (id) => {
  return axios.get(`pathidentify/info`, {
    params: {
      id: id
    },
    baseURL: baseURL
  })
}
/**
 * 收费站
 */
// 列表查询
export const loadTollStationList = (params) => {
  return axios.post(`tollstation/getTollStationList`, params)
}
// 删除
export const removeTollStation = (params) => {
  return axios.post(`tollstation/updateTollStationInfo`, params)
}
// 编辑
export const editTollStation = (params) => {
  return axios.post(`tollstation/updateTollStationInfo`, params)
}
// 详情
export const queryTollStationDetailById = (id) => {
  return axios.get(`tollstation/getSingleStation`, {
    params: {
      id: id
    },
    baseURL: baseURL
  })
}
// 统计
export const statTollByType = (params) => {
  return axios.get(`tollstation/statTollByType`, {
    params: params,
    baseURL: baseURL
  })
}

// 按省份统计收费站总数
export const statTollStationBycity = () => {
  return axios.get(`/tollstation/statTollStationBycity`, {
    params: {
      types: '1, 2'
    },
    baseURL: baseURL
  })
}
// 查询
export const getAllTollStation = (params) => {
  return axios.get(`/tollstation/getAllTollStation`, {
    params: params,
    baseURL: baseURL
  })
}

// 加载空间数据
export const loadLyaerGeom = (val) => {
  return axios.get(`/static/json/geom/${val}.json`, {
    baseURL: ''
  })
}

// 收费站统计
export const statTollStation = (params) => {
  return axios.get(`tollstation/statTollByType`, {
    params: params,
    baseURL: baseURL
  })
}

/**
 * 收费站广场
 */
// 列表查询
export const loadTollStationSquareList = (params) => {
  return axios.post(`tollplaza/getTollPlazaList`, params)
}
// 删除
export const removeTollStationSquare = (params) => {
  return axios.post(`tollplaza/updateTollPlazaInfo`, params)
}
// 编辑
export const editTollStationSquare = (params) => {
  return axios.post(`tollplaza/updateTollPlazaInfo`, params)
}
// 详情
export const queryTollStationSquareDetailById = (id) => {
  return axios.get(`tollplaza/getSinglePlaza`, {
    params: {
      id: id
    },
    baseURL: baseURL
  })
}
// 通过收费站编码查询收费站广场
export const loadTollStationSquareByTollStationId = (id) => {
  return axios.get(`tollplaza/getTollPlazaByStationId`, {
    params: {
      stationId: id
    },
    baseURL: baseURL
  })
}
// 统计
export const statTollPlaza = (params) => {
  return axios.get(`tollplaza/statTollPlaza`, {
    params: params,
    baseURL: baseURL
  })
}
/**
 * 收费车道
 */
// 列表查询
export const loadTollStationLaneList = (params) => {
  return axios.post(`tollplazalane/getTollPlazaLaneList`, params, {
    baseURL: baseURL
  })
}
// 删除
export const removeTollStationLane = (params) => {
  return axios.post(`tollplazalane/updateTollPlazaLaneInfo`, params, {
    baseURL: baseURL
  })
}
// 编辑
export const editTollStationLane = (params) => {
  return axios.post(`tollplazalane/updateTollPlazaLaneInfo`, params, {
    baseURL: baseURL
  })
}
// 详情
export const queryTollStationLaneDetailById = (id) => {
  return axios.get(`tollplazalane/getSinglePlazaLane`, {
    params: {
      id: id
    },
    baseURL: baseURL
  })
}
// 统计
export const statPlazaLane = (params) => {
  return axios.get(`tollplazalane/StatPlazaLane`, {
    params: params,
    baseURL: baseURL
  })
}
/**
 * ETC服务网点
 */
// 列表查询
export const loadETCServerList = (params) => {
  return axios.post(`servicepoint/getServiceList`, params, {
    baseURL: baseURL
  })
}
// 删除
export const removeETCServer = (params) => {
  return axios.post(`servicepoint/updateServiceInfo`, params, {
    baseURL: baseURL
  })
}
// 编辑
export const editETCServer = (params) => {
  return axios.post(`servicepoint/updateServiceInfo`, params, {
    baseURL: baseURL
  })
}
// 详情
export const queryETCServerDetailById = (id) => {
  return axios.get(`servicepoint/getSingleService`, {
    params: {
      id: id
    },
    baseURL: baseURL
  })
}
// 统计
export const statServicePoint = (params) => {
  return axios.get(`servicepoint/statServicePoint`, {
    params: params,
    baseURL: baseURL
  })
}
/**
 * 服务区
 */
// 列表查询
export const loadServiceAreaList = (params) => {
  return axios.post(`servicearea/getServiceAreaList`, params, {
    baseURL: baseURL
  })
}
// 删除
export const removeServiceArea = (params) => {
  return axios.post(`/servicearea/updateServiceAreaInfo`, params, {
    baseURL: baseURL
  })
}
// 编辑
export const editServiceArea = (params) => {
  return axios.post(`/servicearea/updateServiceAreaInfo`, params, {
    baseURL: baseURL
  })
}
// 详情
export const queryServiceAreaDetailById = (id) => {
  return axios.get(`/servicearea/getServiceAreaById`, {
    params: {
      id: id
    },
    baseURL: baseURL
  })
}
// 统计
export const statFwq = (params) => {
  return axios.get(`servicearea/statFwq`, {
    params: params,
    baseURL: baseURL
  })
}
/**
 * 停车场
 */
// 列表查询
export const loadParkList = (params) => {
  return axios.post(`park/getParkList`, params, {
    baseURL: baseURL
  })
}
// 删除
export const removePark = (params) => {
  return axios.post(`/park/updateParkInfo`, params, {
    baseURL: baseURL
  })
}
// 编辑
export const editPark = (params) => {
  return axios.post(`/park/updateParkInfo`, params, {
    baseURL: baseURL
  })
}
// 详情
export const queryParkDetailById = (id) => {
  return axios.get(`/park/getParkById`, {
    params: {
      id: id
    },
    baseURL: baseURL
  })
}
// 统计
export const statPark = (params) => {
  return axios.get(`park/statPark`, {
    params: params,
    baseURL: baseURL
  })
}
/**
 * 加油站
 */
// 列表查询
export const loadGasStationList = (params) => {
  return axios.post(`gas/getGasList`, params, {
    baseURL: baseURL
  })
}
// 删除
export const removeGasStation = (params) => {
  return axios.post(`/gas/updateGasInfo`, params, {
    baseURL: baseURL
  })
}
// 编辑
export const editGasStation = (params) => {
  return axios.post(`/gas/updateGasInfo`, params, {
    baseURL: baseURL
  })
}
// 详情
export const queryGasStationDetailById = (id) => {
  return axios.get(`/gas/getGasById`, {
    params: {
      id: id
    },
    baseURL: baseURL
  })
}
// 统计
export const statGas = (params) => {
  return axios.get(`gas/statGas`, {
    params: params,
    baseURL: baseURL
  })
}

// 查询路线列表
export const loadRoadList = (_params) => {
  return axios.get(`/static/json/lx.json`, {
    params: _params,
    baseURL: baseURL
  })
}

/**
 * 根据收费站编号查询收费站广场列表（不分页）
 * @param stationId
 * @returns {AxiosPromise}
 */
export const queryTollStationSquareListBySfzBh = (stationId) => {
  return axios.get(`/tollplaza/getTollPlazaByStationId`, {
    params: {
      stationId: stationId
    },
    baseURL: baseURL
  })
}

/**
 * 根据收费站广场编号查询收费站车道列表（不分页）
 * @param plazaid 广场id
 * @param operations 操作状态
 * @returns {AxiosPromise}
 */
export const queryTollStationLaneListByPlazaid = (plazaid, operations) => {
  return axios.get(`/tollplazalane/getPlazaLaneByPlazaid`, {
    params: {
      plazaid: plazaid,
      operations: operations
    },
    baseURL: baseURL
  })
}

/**
 * 获取登陆用户信息
 * @param _params
 * @returns {AxiosPromise}
 */
export const getUserInfo = (_params) => {
  return axios.get(`/static/json/user.json`, {
    params: _params,
    baseURL: './'
  })
}

/**
 * 获取角色列表
 * @param _params
 * @returns {AxiosPromise}
 */
export const getRoleList = (_params) => {
  return axios.get(`/auth/getRoles`, {
    params: _params,
    baseURL: baseURL
  })
}

/**
 * 添加角色
 * @param _params
 * @returns {AxiosPromise}
 */
export const addRole = (_params) => {
  return axios.post(`/auth/insertRole`, _params, {
    baseURL: baseURL
  })
}

/**
 * 编辑角色
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateRole = (_params) => {
  return axios.post(`/auth/updateRole`, _params, {
    baseURL: baseURL
  })
}

/**
 * 删除角色
 * @param id
 * @returns {AxiosPromise}
 */
export const deleteRole = (_params) => {
  return axios.post(`/auth/deleteRole?id=` + _params.id, {
    baseURL: baseURL
  })
}

/**
 * 为角色分配模块权限
 * @param _params
 * @returns {AxiosPromise}
 */
export const setRoleModulesById = (_params) => {
  return axios.post(`/auth/insertRoleModules?roleid=` + _params.roleid + '&moduleids=' + _params.moduleids, {
    baseURL: baseURL
  })
}

/**
 * 根据角色id获取模块权限
 * @param _params
 * @param operation
 * @returns {Promise<any>}
 */
export const getRoleModulePermissions = (_params, operation) => {
  return axios.get(`/auth/getModulesByRoleid`, {
    params: _params,
    baseURL: baseURL
  }).then(res => {
    res.data['handleData'] = {
      oldData: res.data.data,
      newData: this.getRoots(null, res.data.data, operation)
    }
    return new Promise((resolve, reject) => {
      resolve(res)
    })
  })
}

/**
 * 处理权限数据应当显示的根节点
 * @param id
 * @param data
 * @param operator
 * @returns {{per: Array, id: *}}
 */
export const getRoots = (id, data, operator) => {
  try {
    let per = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].pid === null || data[i].pid === '' || data[i].pid === '00') {
        if (operator === 'query') {
          data[i].isEdit = false
        } else if (operator === 'edit') {
          data[i].isEdit = true
        } else {
          data[i].isEdit = false
        }
        per.push(data[i])
      }
    }
    this.getChildren(per, data, operator)
    let fn = {
      'per': per,
      'id': id
    }
    return fn
  } catch (error) {
    console.error(error)
  }
}

/**
 * 处理权限数据应当显示的children内容
 * @param pid
 * @param allData
 * @param operator
 */
export const getChildren = (pid, allData, operator) => {
  try {
    if (pid.length !== 0) {
      for (var i = 0; i < pid.length; i++) {
        pid[i].children = []
        for (var j = 0; j < allData.length; j++) {
          if (operator === 'query') {
            allData[j].isEdit = false
          } else if (operator === 'edit') {
            allData[j].isEdit = true
          } else {
            allData[j].isEdit = false
          }
          if (pid[i].id === allData[j].pid) {
            pid[i].children.push(allData[j])
          }
        }
        this.getChildren(pid[i].children, allData, operator)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * 校验角色名称是否唯一
 * @param _params
 * @returns {AxiosPromise}
 */
export const queryRoleByRoleName = (_params) => {
  return axios.get(`/auth/checkRole`, {
    params: _params,
    baseURL: baseURL
  })
}

/**
 * 获取用户列表
 * @param _params
 * @returns {AxiosPromise}
 */
export const getUserList = (_params) => {
  return axios.post(`/auth/getUserList`, _params, {
    baseURL: baseURL
  })
}

/**
 * 根据用户id获取相应权限
 * @param _params
 * @returns {AxiosPromise}
 */
export const getRoleModulesByUser = (_params) => {
  return axios.get(`/auth/getRolesByUserId`, {
    params: _params,
    baseURL: baseURL
  })
}

/**
 * 为用户分配角色
 * @param _params
 * @returns {AxiosPromise}
 */
export const setUserModulesById = (_params) => {
  return axios.post(`/auth/insertUserRoles?userid=` + _params.userid + '&roleids=' + _params.roleids, {
    baseURL: baseURL
  })
}

/**
 * 根据用户id获取用户权限  获取相应有权限的模块
 * @param _params
 * @returns {AxiosPromise}
 */
export const getAuthByUserId = (_params) => {
  return axios.get(`/auth/getAuthByUserId`, {
    params: _params,
    baseURL: baseURL
  }).then(res => {
    let data = res.data.data
    data.forEach((el, index) => {
      navigation.forEach((ele) => {
        if (el['code'] === ele['index']) {
          data[index]['index'] = ele['index']
          data[index]['alias'] = ele['alias']
          data[index]['icon'] = ele['icon']
        }
      })
    })
    res.data['handleData'] = {
      oldData: data,
      newData: this.getRoots(null, data, null)
    }
    return new Promise((resolve, reject) => {
      resolve(res)
    })
  })
}

export const loadXzqhByCode = params => {
  return axios.get('?where=' + params.where + '&outFields=*&f=pjson', {
    baseURL: ARCGIS_URL
  })
}
