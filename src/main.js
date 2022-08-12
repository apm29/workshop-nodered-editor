import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)

// install all modules under `modules/` 自动导入modules文件夹下的js模块,并且自动注册到vue实例中,需要暴露install方法方法,接收一个参数,包含vue实例
Object.values(import.meta.globEager('./modules/*.js')).forEach(function (i) {
  return i.install?.({ app })
})
//mount
app.mount('#app')
