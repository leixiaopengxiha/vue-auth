// 请求接口
import axios from "axios";

// axios.defaults.baseURL = "http://132.232.89.22:8080"


axios.interceptors.response.use((res) => {
    return res.data
}, (err) => {
    return Promise.reject(err)
})


export let getAuth = () => {
    // 使用 axios
    return axios({
        method: 'get',
        url: '/auth'
    })
}