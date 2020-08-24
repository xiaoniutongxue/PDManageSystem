import {request} from "../request";

export function get_modelfile(filepath) {
  return request({
    methods:'GET',
    url:'/get_modelfile',
    params:{
      filepath
    },
  })
}
