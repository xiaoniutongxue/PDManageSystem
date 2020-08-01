import {request} from "../request";

export function get_imgdata(img_url) {
  return request({
    method:'POST',
    url:"/get_imgdata",
    params:{
      img_url
    }
  })
}


export function get_file(url) {
  return request({
    method:'GET',
    url:"/get_file",
    params:{
      url
    }
  })
}
