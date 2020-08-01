import axios from 'axios'

export function request(config) {
    const instance=axios.create({
        /*baseURL:'http://121.36.22.148:5000/',*/
        baseURL:'http://127.0.0.1:5000/',
    })

    instance.interceptors.request.use(config=>{
        return config
    },error=>{
        console.log(error)
    })

    instance.interceptors.response.use(res=>{
        return res.data;
    },error=>{
        console.log(error)
    })
    return instance(config)
}
