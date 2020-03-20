import { Post, Get } from '@/api/axios.config'
const WaybillAjax = {
  AllWaybill (params) {
    // 经销商app-全部运单
    let result = Post('/waybill/api/waybillApp/querySendClientAllWaybill', params)
    return result
  },
  WaybillDetail (params) {
    // 经销商app-运单详情
    let result = Get('/waybill/api/waybillApp/sendClientinfo', params)
    return result
  },
  QueryClientAllWaybill (params) {
    // 查询修理厂端/经销商APP运单列表查询
    let result = Post('/waybill/api/waybillApp/queryClientAllWaybill', params)
    return result
  },
  QueryDetail (params) {
    // 修理厂/经销商-运单详情
    let result = Get('/waybill/api/waybillApp/queryClientDetailWaybill', params)
    return result
  },
  DeleteTemporaryWaybill (params) {
    // 经销商删除临时运单
    let result = Get('/waybill/appWaybilOperate/deleteTemporaryWaybill', params)
    return result
  }

}

export default WaybillAjax
