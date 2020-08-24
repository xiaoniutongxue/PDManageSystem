import {request} from "../request";

/*获取附件数据*/
export function get_acctypedata(seriesid) {
  return request({
    method:'GET',
    url:'/get_acctypedata',
    params:{
      seriesid
    }
  })
}

/*添加附件类型数据*/
export function add_acctypedata(typedata) {
  return request({
    method:'POST',
    url:'/add_acctypedata',
    params:{
      typedata
    }
  })
}

/*添加附件标题数据*/
export function add_accpropdata(propdata) {
  return request({
    method:'POST',
    url:'/add_accpropdata',
    params:{
      propdata
    }
  })
}

/*添加附件选项数据*/
export function add_accoptdata(optdata) {
  return request({
    method:'POST',
    url:'/add_accoptdata',
    params:{
      optdata
    }
  })
}

/*修改附件类型数据*/
export function update_acctypedata(typedata) {
  return request({
    method:'POST',
    url:'/update_acctypedata',
    params:{
      typedata
    }
  })
}

/*修改附件标题数据*/
export function update_accpropdata(propdata) {
  return request({
    method:'POST',
    url:'/update_accpropdata',
    params:{
      propdata
    }
  })
}

/*修改附件选项数据*/
export function update_accoptdata(optdata) {
  return request({
    method:'POST',
    url:'/update_accoptdata',
    params:{
      optdata
    }
  })
}

/*删除附件类型数据*/
export function del_acctypedata(typeId) {
  return request({
    method:'GET',
    url:'/del_acctypedata',
    params:{
      typeId
    }
  })
}

/*删除附件标题数据*/
export function del_accpropdata(propId) {
  return request({
    method:'GET',
    url:'/del_accpropdata',
    params:{
      propId
    }
  })
}

/*删除附件选项数据*/
export function del_accoptdata(optId) {
  return request({
    method:'GET',
    url:'/del_accoptdata',
    params:{
      optId
    }
  })
}

/*批量添加关系*/
export function add_accrelbatch(accreldatalist) {
  return request({
    method:'POST',
    url:'/add_accrelbatch',
    params:{
      accreldatalist
    }
  })
}

/*添加关系*/
export function add_accrel(accreldatalist) {
  return request({
    method:'POST',
    url:'/add_accrel',
    params:{
      accreldatalist
    }
  })
}

/*修改关系*/
export function update_accrel(accreldatalist) {
  return request({
    method:'POST',
    url:'/update_accrel',
    params:{
      accreldatalist
    }
  })
}

/*删除关系*/
export function del_accrel(relID) {
  return request({
    method:'GET',
    url:'/del_accrel',
    params:{
      relID
    }
  })
}

/*获取所有关系数据*/
export function get_accrelall(seriesid,typeId) {
  return request({
    method:'GET',
    url:'/get_accrelall',
    params:{
      seriesid,
      typeId
    }
  })
}

/*获取本体规格所有的关系(前端可视化)*/
export function get_accrelview(seriesid,typeId) {
  return request({
    method:'GET',
    url:'/get_accrelview',
    params:{
      seriesid,
      typeId
    }
  })
}

/*获取附件筛选关系*/
export function get_accrel(seriesid, acc_propstr, acc_optstr) {
  return request({
    method:'GET',
    url:'/get_accrel',
    params:{
      seriesid,
      acc_propstr,
      acc_optstr
    }
  })
}

/*根据类型获取所有型号价格数据*/
export function get_acccompdatabytype(seriesid,typeid) {
  return request({
    methods:'GET',
    url:'/get_acccompdatabytype',
    params:{
      seriesid,
      typeid
    },
  })
}

/*添加型号价格数据*/
export function add_acccompdata(compdata) {
  return request({
    method:'POST',
    url:'/add_acccompdata',
    params:{
      compdata
    },
  })
}

/*修改型号价格数据*/
export function update_acccompdata(compdata) {
  return request({
    method:'POST',
    url:'/update_acccompdata',
    params:{
      compdata
    },
  })
}

/*删除型号价格数据*/
export function del_acccompdata(compId) {
  return request({
    method:'GET',
    url:'/del_acccompdata',
    params:{
      compId
    },
  })
}
