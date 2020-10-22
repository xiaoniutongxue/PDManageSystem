import {request} from "../request";

/*获取用户信息*/
export function get_user() {
  return request({
    method:'GET',
    url:'/get_user',
  })
}

/*添加用户信息*/
export function user_add(userdata) {
  return request({
    method:'POST',
    url:'/user_add',
    params:{
      userdata
    }
  })
}

/*修改用户信息*/
export function user_update(userdata) {
  return request({
    method:'POST',
    url:'/user_update',
    params:{
      userdata
    }
  })
}

/*修改用户密码*/
export function user_updatepwd(pwddata) {
  return request({
    method:'POST',
    url:'/user_updatepwd',
    params:{
      pwddata
    }
  })
}

/*删除用户信息*/
export function user_del(uid) {
  return request({
    method:'GET',
    url:'/user_del',
    params:{
      uid
    }
  })
}

/*验证用户登录*/
export function user_login(userdata) {
  return request({
    method:'POST',
    url:'/user_login',
    params:{
      userdata
    }
  })
}
