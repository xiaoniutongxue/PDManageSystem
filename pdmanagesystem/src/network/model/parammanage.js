import {request} from "../request";

/*获取特性参数所有数据*/
export function get_paramdata(seriesid) {
  return request({
    method:'GET',
    url:'/get_paramdata',
    params:{
      seriesid
    }
  })
}

/*添加特性参数类型*/
export function add_paramtype(typedata) {
  return request({
    method:'POST',
    url:'/add_paramtype',
    params:{
      typedata
    }
  })
}

/*添加特性参数选项*/
export function add_paramopt(optdata) {
  return request({
    method:'POST',
    url:'/add_paramopt',
    params:{
      optdata
    }
  })
}

/*修改特性参数类型*/
export function update_paramtype(typedata) {
  return request({
    method:'POST',
    url:'/update_paramtype',
    params:{
      typedata
    }
  })
}

/*修改特性参数选项*/
export function update_paramopt(optdata) {
  return request({
    method:'POST',
    url:'/update_paramopt',
    params:{
      optdata
    }
  })
}

/*删除特性参数类型*/
export function del_paramtype(typeId) {
  return request({
    method:'GET',
    url:'/del_paramtype',
    params:{
      typeId
    }
  })
}

/*删除特性参数选项*/
export function del_paramopt(optId) {
  return request({
    method:'GET',
    url:'/del_paramopt',
    params:{
      optId
    }
  })
}
