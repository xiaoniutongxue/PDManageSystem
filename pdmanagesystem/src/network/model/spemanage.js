import {request} from "../request";

//选型数据添加
/*获取本体规格数据*/
export function get_spedata(seriesid) {
    return request({
        url:"/get_spedata",
        params:{
            seriesid
        }
    })
}

/*添加标题*/
export function add_speprop(propdata) {
    return request({
        method:'POST',
        url:'/add_speprop',
        params:{
            propdata
        }
    })
}

/*删除标题*/
export function del_speprop(seriesid,propid) {
    return request({
        method:'GET',
        url:'/del_speprop',
        params:{
            seriesid,
            propid
        }
    })
}

/*修改标题*/
export function update_speprop(propdate) {
  return request({
    method:'POST',
    url:'/update_speprop',
    params:{
      propdate
    }
  })
}

/*添加选项*/
export function add_speopt(optdata) {
    return request({
        method:'POST',
        url:'/add_speopt',
        params:{
            optdata
        }
    })
}

/*删除选项*/
export function del_speopt(optid) {
    return request({
        method:'GET',
        url:'/del_speopt',
        params:{
            optid
        }
    })
}

/*修改选项*/
export function update_speopt(optdate) {
  return request({
    method:'POST',
    url:'/update_speopt',
    params:{
      optdate
    }
  })
}

/*添加关系*/
export function add_sperel(spereldatalist) {
    return request({
        method:'POST',
        url:'/add_sperel',
        params:{
            spereldatalist
        }
    })
}

/*删除关系*/
export function del_sperel(relID) {
    return request({
        method:'GET',
        url:'/del_sperel',
        params:{
          relID
        }
    })
}

/*获取所有关系数据*/
export function get_sperelall(seriesid) {
    return request({
        method:'GET',
        url:'/get_sperelall',
        params:{
            seriesid
        }
    })
}

/*获取本体规格所有的关系(前端可视化)*/
export function get_sperelview(seriesid) {
  return request({
    method:'GET',
    url:'/get_sperelview',
    params:{
      seriesid
    }
  })
}

/*获取本体规格所有的关系(前端id可视化)*/
export function get_sperelid(seriesid) {
  return request({
    method:'GET',
    url:'/get_sperelid',
    params:{
      seriesid
    }
  })
}

/*获取本体规格筛选关系*/
export function get_sperel(seriesid, spe_propstr, spe_optstr) {
    return request({
        method:'GET',
        url:'/get_sperel',
        params:{
            seriesid,
            spe_propstr,
            spe_optstr
        }
    })
}

/*根据系列id获取该系列的标题数据*/
export function get_propbyid(seriesid) {
    return request({
        method:'GET',
        url:'/get_propbyid',
        params:{
            seriesid
        }
    })
}

/*根据系列id获取该系列的标题数据*/
export function get_optbyid(seriesid) {
    return request({
        method:'GET',
        url:'/get_optbyid',
        params:{
            seriesid
        }
    })
}

/*获取所有型号价格数据*/
export function get_specompdata(seriesid) {
  return request({
    methods:'GET',
    url:'/get_specompdata',
    params:{
      seriesid
    },
  })
}

/*添加型号价格数据*/
export function add_specompdata(compdata) {
  return request({
    method:'POST',
    url:'/add_specompdata',
    params:{
      compdata
    },
  })
}

/*修改型号价格数据*/
export function update_specompdata(compdata) {
  return request({
    method:'POST',
    url:'/update_specompdata',
    params:{
      compdata
    },
  })
}

/*删除型号价格数据*/
export function del_specompdata(compId) {
  return request({
    method:'GET',
    url:'/del_specompdata',
    params:{
      compId
    },
  })
}


