import axios from 'axios'

export function request(config) {
    const instance=axios.create({
        /*baseURL:'http://121.36.22.148:5000/',*/
        /*baseURL:'http://127.0.0.1:5000/',*/
         baseURL:'http://192.168.2.184:5000/',
    })

    /*请求拦截*/
    instance.interceptors.request.use(config=>{
        return config
    },error=>{
        console.log(error)
    })

    /*响应拦截*/
    instance.interceptors.response.use(res=>{
        return res.data;
    },error=>{
        console.log(error)
    })
    return instance(config)
}
