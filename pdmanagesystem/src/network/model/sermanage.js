import {request} from "../request";


/*根据厂商id查询其系列*/
export function get_seriesdata(factId) {
  return request({
    method:'GET',
    url:'/get_seriesdata',
    params:{
      factId
    }
  })
}


/*系列添加*/
export function add_seriesdata(seriesdata) {
  return request({
    method:'POST',
    url:'/add_seriesdata',
    params:{
      seriesdata
    }
  })
}


/*系列修改*/
export function update_seriesdata(seriesdata) {
  return request({
    method:'POST',
    url:'/update_seriesdata',
    params:{
      seriesdata
    }
  })
}

/*系列删除*/
export function delete_seriesdata(seriesid) {
  return request({
    method:'GET',
    url:'/delete_seriesdata',
    params:{
      seriesid
    }
  })
}
