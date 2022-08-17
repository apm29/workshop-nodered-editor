import path from 'path'
import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue2'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import legacy from '@vitejs/plugin-legacy'
import Unocss from 'unocss/vite'
import { splitVendorChunkPlugin } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  base: "/nodered/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'element-ui': ['element-ui'],
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '~/',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
      // '@antv/x6-vue-shape': '@antv/x6-vue-shape/dist/x6-vue-shape.js',
      {
        find: '@antv/x6',
        replacement: '@antv/x6/lib',
      },
      {
        find: '@antv/x6-vue-shape',
        replacement: '@antv/x6-vue-shape/lib',
      },
    ]
  },
  plugins: [
    VuePlugin(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({
      resolvers: [ElementUiResolver()]
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    legacy({
      targets: ['defaults', 'not ie < 9'],
    }),
    splitVendorChunkPlugin(),
  ],
  server: {
    port: 7456,
    proxy: {
      "/java": {
        target: "http://atcc-workshoptest.ciih.net",
        changeOrigin: true,
      },
    }
  }
})
