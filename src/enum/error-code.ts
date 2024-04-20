import { getEnum } from "./index"
export const errorCodeEN =  {
  400: 'Error request, status code:400',
  401: 'Unauthorized, please login again, status code:401',
  403: 'Access denied, status code:403',
  404: 'Request error, the resource was not found, status code:404',
  405: 'Request method not allowed, status code:405',
  408: 'Request timeout, status code:408',
  500: 'Server side error, status code:500',
  501: 'Network not implemented, status code:501',
  502: 'Gateway error, status code:502',
  503: 'Service unavailable, status code:503',
  504: 'Network timeout, status code:504',
  505: 'The HTTP version does not support this request, status code:505',
}
export const errorCodeCN = {
  400: '错误请求，状态码:400',
  401: '未授权，请重新登录，状态码:401',
  403: '拒绝访问，状态码:403',
  404: '请求错误,未找到该资源，状态码:404',
  405: '请求方法未允许，状态码:405',
  408: '请求超时，状态码:408',
  500: '服务器端出错，状态码:500',
  501: '网络未实现，状态码:501',
  502: '网关错误，状态码:502',
  503: '服务不可用，状态码:503',
  504: '网络超时，状态码:504',
  505: 'HTTP版本不支持该请求，状态码:505',
}
export default getEnum(errorCodeCN, errorCodeEN)