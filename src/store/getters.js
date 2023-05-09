const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304232117674.bmp",
  name: state => state.user.name
}
export default getters
