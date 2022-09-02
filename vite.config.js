import path from "path";
import { defineConfig } from "vite";
import vitePluginVue from "@vitejs/plugin-vue2";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import legacy from "@vitejs/plugin-legacy";
import Unocss from "unocss/vite";
import { splitVendorChunkPlugin } from "vite";
import requireContext from "rollup-plugin-require-context"; // 处理兼容webpack工具require-context;
import Pages from 'vite-plugin-pages'
// https://vitejs.dev/config/
export default defineConfig({
  base: "/nodered/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "element-ui": ["element-ui"],
          "@antv/x6": ["@antv/x6"],
          "@antv/g6": ["@antv/g6"],
          jsonWorker: [`monaco-editor/esm/vs/language/json/json.worker`],
          tsWorker: [`monaco-editor/esm/vs/language/typescript/ts.worker`],
          editorWorker: [`monaco-editor/esm/vs/editor/editor.worker`],
        },
        sourcemap: false
      },
    },
    minify: false
  },
  optimizeDeps: {
    exclude: ["@antv/x6-vue-shape"],
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/typesript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`,
    ],
  },
  resolve: {
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: [
      {
        find: "~/",
        replacement: `${path.resolve(__dirname, "src")}/`,
      },
    ],
  },
  plugins: [
    requireContext(),
    vitePluginVue(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue/macros", "@vueuse/core"],
      dts: true,
      dirs: ["./src/composables"],
      vueTemplate: true,
    }),
    // Components({
    //   resolvers: [ElementUiResolver()]
    // }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    Components({
      resolvers: [VantResolver()],
    }),
    legacy({
      targets: ["defaults", "not ie < 9"],
    }),
    splitVendorChunkPlugin(),

    Pages({})
  ],
  server: {
    port: 7456,
    proxy: {
      "/java": {
        target: "http://atcc-workshoptest.ciih.net",
        changeOrigin: true,
      },
    },
  },
});
