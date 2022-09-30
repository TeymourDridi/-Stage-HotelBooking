import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'



const baseURL = 'http://127.0.0.1:5000'


let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null


const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.accessToken}` }
});


axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) {
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.accessToken}`
    }

    const user = jwt_decode(authTokens.accessToken)
    console.log(user);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req

    const response = await axios.post(`${baseURL}/token`, { refresh: authTokens.refreshToken });

    console.log(response);
    localStorage.setItem('authTokens',
        JSON.stringify({ accessToken: response.data, refreshToken: authTokens.refreshToken }))
    req.headers.Authorization = `Bearer ${response.data}`
    return req
})


export default axiosInstance;