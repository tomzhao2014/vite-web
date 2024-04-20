import { storeToRefs } from "pinia"
import { useCounterStore} from '@/stores/counter'
// 如果此代码是抽离到了单独ts文件内，那下面部分需要再 放置 setup 内
// 变量需要使用 storeToRefs 转为响应式数据
const { count } = storeToRefs(useCounterStore())
// 方法直接使用即可
const { increment } = useCounterStore()
increment()
console.log('count', count)