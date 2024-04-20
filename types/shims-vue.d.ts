declare module '*.vue' {
    import type { DefineComponent } from 'vue';
  
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
  // declare module '*.vue' {
  //   import { DefineComponent } from 'vue'
  //   const component: DefineComponent<{}, {}, any>
  //   export default component
  // }
  
  
  /**
   * window上属性自定义
   */
  interface Window {
    [key: string]: string | number | Types.Noop | Types.PlainObject | unknown;
    WeixinJSBridge: any;
  }
  
  declare module '*.svg';
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.jpeg';
  declare module '*.gif';
  declare module '*.bmp';
  declare module '*.tiff';
  declare module '*.mp3';
  
  declare module 'lodash';
  
  declare module '@/utils/pictureVerfy/pawebjs.min.js';