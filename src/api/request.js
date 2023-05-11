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

    //
    login: (adminName, password) => service.post('/admin/login', { adminName, password }),



    getDailyPageViews: (year, month, day) => service.get(`/pageViews/getDailyPageViews/${year}/${month}/${day}`),
    getMonthViews: (year, month) => service.get(`/pageViews/getMonthViews/${year}/${month}`),
    getYearPageViews: (year) => service.get(`/pageViews/getYearPageViews/${year}/`),

    //实际数据
    getLastWeekCommentStatistics: () => service.get('/statistics/lastWeekCommentStatistics'),
    getLastWeekUserStatistics: () => service.get('/statistics/lastWeekUserStatistics'),
    getLastWeekNewUserStatistics: () => service.get('/statistics/lastWeekNewUserStatistics'),
    getLastWeekUserSignStatistics: () => service.get('/statistics/lastWeekUserSignStatistics'),


    getLastWeekAnimationPageViewStatistics: () => service.get('/statistics/getLastWeekAnimationPageViewStatistics'),
    getLastWeekComicPageViewStatistics: () => service.get('/statistics/getLastWeekComicPageViewStatistics'),
    getLastWeekGamePageViewStatistics: () => service.get('/statistics/getLastWeekGamePageViewStatistics'),
    getLastWeekNovelPageViewStatistics: () => service.get('/statistics/getLastWeekNovelPageViewStatistics'),


    //预测数据
    getLastWeekCommentForecast: () => service.get('/forecast/lastWeekCommentForecast'),
    getLastWeekUserForecast: () => service.get('/forecast/lastWeekUserForecast'),
    getLastWeekNewUserForecast: () => service.get('/forecast/lastWeekNewUserForecast'),

    getLastWeekUserSignForecast: () => service.get('/forecast/lastWeekUserSignForecast'),

    //公告
    addNotice: (id, createdAdminName, title, content) => service.post('/notice/addNotice', { id, createdAdminName, title, content }),
    noticeList: (currentPage, pageSize) => service.get(`/notice/noticeList/${currentPage}/${pageSize}`),
    deleteNotice: (noticeId) => service.get(`/notice/deleteNotice/${noticeId}`),


    //帖子
    postDetails: (id) => service.get(`/post/postDetails/${id}`),
    deletePostByAdmin: (postId) => service.get(`/post/deletePostByAdmin/${postId}`),

    //举报
    getReportList: (currentPage, pageSize) => service.get(`/report/reportList/${currentPage}/${pageSize}`),
    handleReport: (reportId) => service.get(`/report/handleReport/${reportId}`),

    //用户
    getUserInfo: (id) => service.get(`/user/userInfo/${id}`),
    getUserInfoList: (currentPage, pageSize) => service.get(`/user/userInfoList/${currentPage}/${pageSize}`),
    banUser: (id) => service.get(`/user/banUser/${id}`),
    cancelBanUser: (id) => service.get(`/user/cancelBanUser/${id}`),

}
export default api
