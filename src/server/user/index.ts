import { post, get, postForm } from '@/server/index';
import { objectToFormData } from '@/utils'
import type { 
  LoginReq, LoginRes
} from './interface';

/**
 * 登录
 * @param loginReq
 */
export const login = (loginReq: LoginReq) => {
  return post<LoginReq, LoginRes>('/user/login', loginReq)
}
// export const login = (params: LoginParamsType) => {
//   return get<LoginParamsType, LoginResType>('/user/login', params)
// }
// export const login = (params: LoginParamsType) => {
//   return postForm<FormData, LoginResType>('/user/login', objectToFormData( params ))
// }