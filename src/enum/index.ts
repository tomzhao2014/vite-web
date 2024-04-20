import { getLanguage } from "@/lang"
/**
 * 获取枚举
 * @param ZHCN 中文枚举
 * @param EN 英文枚举
 * @returns 
 */
export const getEnum = (ZHCN: unknown, EN: unknown) => {
  const lang = getLanguage()
  switch (lang) {
    case 'zh-CN':
      return ZHCN
    case 'en-US':
      return EN
    default :
      return {}
  }
}