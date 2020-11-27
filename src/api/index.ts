import axios from 'axios'
interface paramsObj{
    url: String
}
const request = (params:paramsObj) => {
    const baseUrl:string = 'http://www.tj123.xyz:3000'
    if(!params.url){
        return
    }
    const url = baseUrl + params.url
    return axios.get(url).then((res:{data:any})=>{
        if(res.data.code === 200){
            return res.data
        } else {
            return []
        }
    })
}
export default request