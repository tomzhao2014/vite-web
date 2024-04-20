/**
 * 登录参数
 */
export interface LoginReq {
    username: string;
    password: string;
}
/**
 * 登录返回结果
 */
export interface LoginRes {
    token: string;
    state: string;
}