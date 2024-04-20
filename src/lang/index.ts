import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import elementPlus from './element-plus'
import enLocale from './en-US/index'
import zhLocale from './zh-CN/index'

const messages = {
  'zh-CN': zhLocale,
  'en-US': enLocale
}

/**
 * 设置语言环境
 * @param lang 语言环境
 */
export function setLanguage(lang: string) {
  Cookies.set('language', lang || 'zh-CN')
}
/**
 * 获取配置环境
 * @returns 
 */
export function getLanguage() {
  // const bool = true
  // if (bool) {
  //   return 'en'
  // }
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage
  // 如果有需要也可以根据当前用户设备浏览器默认语言
  // const language = navigator.language.toLowerCase() // IE10及IE10以下的版本 使用 navigator.browserLanguage
  // const locales = Object.keys(messages)
  // for (const locale of locales) {
  //   if (language.indexOf(locale.toLowerCase()) > -1) return locale
  // }
  return 'en-US'
}
const i18n = createI18n({
    globalInjection: true, // 全局生效$t
    locale: getLanguage(), // getLanguage()
    messages,
    legacy: false
})
export const elementPlusLocale = elementPlus
export const lang = () => {
  const lang = getLanguage()
  switch (lang) {
    case 'zh-CN':
      return messages['zh-CN']
    case 'en-US':
      return messages['en-US']
  }
  return messages['zh-CN']
}
export default i18n