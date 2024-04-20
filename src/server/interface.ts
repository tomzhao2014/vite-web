export interface BaseResType {
    ResultCode: number
    ResultDescription: string
  }
  export interface ApiResponseType<T> extends BaseResType{
    result: T
  }