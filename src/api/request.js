import axios from 'axios'

const service = axios.create({
    baseURL: '/customApi',
    timeout: 10000
})

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 例如，添加身份验证信息
        // config.headers.Authorization = sessionStorage.getItem('token')
        // const token = localStorage.getItem('token')
        // if (!(token === null || token === 'null')) {
        //     config.headers.token = token;
        // }

        return config
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        return response.data
    },
    error => {
        // 对响应错误做些什么
        return Promise.reject(error)
    }
)
// 封装请求集
const api = {
    getDailyPageViews: (year, month, day) => service.get(`/pageViews/getDailyPageViews/${year}/${month}/${day}`),
    getMonthViews: (year, month) => service.get(`/pageViews/getMonthViews/${year}/${month}`),
    getYearPageViews: (year) => service.get(`/pageViews/getYearPageViews/${year}/`),

    getLastWeekCommentStatistics: () => service.get('/statistics/lastWeekCommentStatistics'),
    getLastWeekUserStatistics: () => service.get('/statistics/lastWeekUserStatistics'),

    //公告
    addNotice: (id, createdAdminName, title, content) => service.post('/notice/addNotice', { id, createdAdminName, title, content }),
    noticeList: () => service.get('/notice/noticeList'),
    deleteNotice: (noticeId) => service.get(`/notice/deleteNotice/${noticeId}`),

    //用户
    getUserInfoList: (currentPage, pageSize) => service.get(`/user/userInfoList/${currentPage}/${pageSize}`),
}
export default api
