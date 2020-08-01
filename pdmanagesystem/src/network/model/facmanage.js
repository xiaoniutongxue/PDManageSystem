import {request} from "../request";

/*获取所有厂商信息*/
export function get_factorydata() {
    return request({
        url:'/get_factorydata'
    })
}

/*添加厂商*/
export function add_factory(facdata) {
    return request({
        method:'POST',
        url:'/add_factory',
        params:{
            facdata
        }
    })
}

/*修改厂商*/
export function updata_factory(facdata) {
    return request({
        method:'POST',
        url:'/updata_factory',
        params:{
            facdata
        }
    })
}

/*删除厂商*/
export function delate_factory(factId) {
    return request({
        methods:'GET',
        url:'/delate_factory',
        params:{
            factId
        }
    })

}

/*获取所有地区信息*/
export function get_areadata() {
    return request({
        url:'/get_areadata'
    })
}
