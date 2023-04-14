import defaultSettings from '@/settings'

const title = defaultSettings.title || 'acgnbbs_admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
