/**
 * 自定义全局类型
 */
declare module 'js-cookie'

type IfEquals<X,Y,A=X,B=never> = 
(<T>() => T extends X ? 1 : 2) extends
(<T>() => T extends Y ? 1 : 2) ? A : B;

/** 获取可编辑key */
export type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{
      [Q in P]: T[P];
    }, {
      -readonly [Q in P]: T[P];
    }, P>
  }[keyof T];
