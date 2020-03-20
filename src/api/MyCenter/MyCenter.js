import { Get, PostFromData } from '@/api/axios.config'

const MyCenterAjax = {
  queryUserInfo (params) {
    // 查询物流公司员工管理查看
    let result = Get('/crm/logisticsPersonnel/query/seeLogisticsPersonnel', params)
    return result
  },
  queryInfo (params) {
    // 查询经销商公司名称及经营地址
    let result = PostFromData('/crm/clientManageController/queryClientNameAddressVo', params)
    return result
  },
  getLogisticsList (params) {
    // 查询物流公司
    // let result = Get('/crm/logisticsCompany/query/getLogisticsList', params)
    let result = Get('/crm/relationManager/query/allList', params)
    return result
  },
  getDearlerInfo (params) {
    // 经销商个人信息修改回显
    let result = Get('/crm/clientManageController/update/updateClientDearlyInfo', params)
    return result
  },
  bindingAssociation (params) {
    // 经销商关联
    let result = PostFromData('/crm/clientManageController/bindingAssociation', params)
    return result
  },
  unlinkAssociation (params) {
    // 经销商取消关联关系
    let result = PostFromData('/crm/clientManageController/unlinkAssociation', params)
    return result
  },
  checkClientCodeRepeat (params) {
    // 客户编码重复校验
    let result = Get('/crm/clientManageController/checkClientCodeRepeat', params)
    return result
  },
  updateClientCode (params) {
    // 修改客户编码
    let result = Get('/crm/clientManageController/update/updateClientCode', params)
    return result
  }
}

export default MyCenterAjax
