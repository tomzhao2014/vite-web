import type { unKnow } from "@/interface";
/**
 * 拼接接口路径，例如代理接口的时候后台接口前缀不统一等，可以自定义个前缀，有助于代理配置。
 * @param url 接口路径（一般只会配置相对路径，也可直接配置绝对路径）
 * @returns 
 */
export const resetInterfacePath = (url: string) => {
    // return `/api/${url}`
    return url
}
/**
 * 对象转formData
 * @param data
 */
export const objectToFormData = (data: object): FormData => {
  let formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    } else {
      formData.append(key, '');
    }
  }
  return formData;
};
/**
 * 对象转数组
* @param data
*/
export const objectToArray = (data: object): Array<Object> => {
 let arr: Array<Object> = []
 for (const [key, value] of Object.entries(data)) {
   if (value !== null && value !== undefined) {
     arr.push(value)
   }
 }
 return arr;
};
/**
 * 地址数据转换
 * @param data 
 * @returns 
 */
export const translateAddress = (data: any) => {
  if (data instanceof Object && !Array.isArray(data)) {
    data = objectToArray(data)
    data = data.map((item: any) => {
      return {
        value: item.code,
        label: item.name,
        children: translateAddress(item.node)
      }
    })
  }
  return data
}

interface Obj {
  [key: string]: string | number;
}
/**
 * 根据对象value获取key
 * @param obj 
 * @param value 
 * @returns 
 */
export const objectGetKeyForValue = (obj: Obj | undefined, value: string | number): string => {
  if (!obj) {
    return ''
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (value === element) {
        return key
      }
    }
  }
  return ''
}
/**
 * 根据数组中子对象value获取对应label
 * @param arr 
 * @param value 
 * @returns 
 */
export const arrayGetLabelForValue = (arr: Array<unKnow> | undefined, value: string | number): string => {
  if (!arr?.length) {
    return ''
  }
  let label = ''
  arr.forEach(element => {
    if (element.value === value) {
      label = element.label
    }
  });
  return label
}