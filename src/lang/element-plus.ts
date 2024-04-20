import elementZhLocale from 'element-plus/es/locale/lang/zh-cn'
import elementEnLocale from 'element-plus/es/locale/lang/en'
import { getLanguage }  from './index'
console.log("test"+getLanguage()+":"+elementZhLocale)
export default () => {
  const lang = getLanguage()
  switch (lang) {
    case 'zh-CN':
      return elementZhLocale
    case 'en-US':
      return elementEnLocale
  }
  return elementEnLocale;
}