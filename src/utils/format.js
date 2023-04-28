function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric",hour:"numeric",minute:"numeric" };
  return new Date(date).toLocaleDateString("zh-CN", options);
}
export { formatDate }

