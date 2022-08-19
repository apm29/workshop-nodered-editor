import { ref, unref, watch } from "vue";
import { Addon } from "@antv/x6";
import { useElementSize } from "@vueuse/core";
export function useCreateStencil(getGraphFn, getStencilContainerFn) {
  const stencilInstance = ref();
  function createStenceil([graph, stencilContainer]) {
    if (!unref(graph) || !unref(stencilContainer)) {
      return;
    }
    //已经mounted了,直接取值
    const { width, height } = useElementSize(stencilContainer);
    console.log("create stencil");
    const stencil = new Addon.Stencil({
      title: "NODE RED节点",
      target: graph,
      stencilGraphWidth: width.value,
      stencilGraphHeight: height.value,
      collapsable: true,
      layoutOptions: {
        columns: 1,
        columnWidth: 150,
        rowHeight: 55,
      },
    });
    unref(stencilContainer).appendChild(stencil.container);

    //注册
    const templates = [
      graph.createNode({
        shape: "comment",
        data: {
          type: "comment",
          name: "注释",
          info: "",
        },
      }),
      graph.createNode({
        shape: "debug",
        data: {
          type: "debug",
          name: "调试",
          active: true,
          tosidebar: true,
          console: false,
          tostatus: false,
          complete: "payload",
          statusVal: "",
          statusType: "auto",
          targetType: "msg",
        },
      }),
      graph.createNode({
        shape: "mqtt in",
        data: {
          type: "mqtt in",
          name: "mqtt in",
          topic: "",
          qos: "2",
          datatype: "auto-detect",
          broker: "",
          nl: false,
          rap: true,
          rh: 0,
          inputs: 0,
        },
      }),
      graph.createNode({
        shape: "mqtt out",
        data: {
          type: "mqtt out",
          name: "mqtt out",
          topic: "",
          qos: "1",
          retain: "",
          respTopic: "",
          contentType: "",
          userProps: "",
          correl: "",
          expiry: "",
          broker: "",
        },
      }),
      graph.createNode({
        shape: "inject",
        data: {
          type: "inject",
          name: "注入",
          props: [
            {
              p: "payload",
              vt: "str",
            },
            {
              p: "topic",
              vt: "str",
            },
          ],
          repeat: "",
          crontab: "*/1 * * * *",
          once: false,
          onceDelay: 0.1,
          topic: "",
          payload: "",
          payloadType: "date",
        },
      }),
      graph.createNode({
        shape: "complete",
        data: {
          type: "complete",
          name: "完成",
          scope: [],
          uncaught: false,
        },
      }),
      graph.createNode({
        shape: "status",
        data: {
          type: "status",
          name: "报告状态",
          scope: null,
          uncaught: false,
        },
      }),
      graph.createNode({
        shape: "delay",
        data: {
          type: "delay",
          name: "延迟",
          pauseType: "delay",
          timeout: "5",
          timeoutUnits: "milliseconds",
          rate: "1",
          nbRateUnits: "1",
          rateUnits: "second",
          randomFirst: "1",
          randomLast: "5",
          randomUnits: "seconds",
          drop: false,
          allowrate: false,
          outputs: 1,
        },
      }),
      graph.createNode({
        shape: "function",
        data: {
          type: "function",
          name: "函数",
          func: "\nreturn msg;",
          outputs: 1,
          noerr: 0,
          initialize: "",
          finalize: "",
          libs: [],
        },
      }),
      graph.createNode({
        shape: "switch",
        data: {
          type: "switch",
          name: "switch",
          property: "payload",
          propertyType: "msg",
          rules: [
            {
              t: "eq",
              v: "",
              vt: "str",
            },
          ],
          checkall: "true",
          repair: false,
          outputs: 1,
        },
      }),

      graph.createNode({
        shape: "influxdb in",
        data: {
          type: "influxdb in",
          name: "influxdb in",
          query: "",
          rawOutput: false,
          precision: "",
          retentionPolicy: "",
          org: "atcc",
        },
      }),
      graph.createNode({
        shape: "influxdb out",
        data: {
          type: "influxdb out",
          name: "influxdb out",
          measurement: "N_P1",
          precision: "",
          retentionPolicy: "",
          database: "database",
          precisionV18FluxV20: "ms",
          retentionPolicyV18Flux: "",
          org: "atcc",
          bucket: "3fc_cf_sbzt",
        },
      }),

      // graph.createNode({
      //   shape: "exec",
      //   data: {
      //     type: "exec",
      //     name: "执行",
      //   },
      // }),
      // graph.createNode({
      //   shape: "http request",
      //   data: {
      //     type: "http request",
      //     name: "Http请求",
      //     method: "GET",
      //     ret: "txt",
      //     paytoqs: false,
      //     url: "",
      //     persist: false,
      //     authType: "",
      //     senderr: false,
      //     headers: [],
      //   },
      // }),
      graph.createNode({
        shape: "ui_gauge",
        data: {
          type: "ui_gauge",
          name: "仪表盘组件",
          group: "",
          order: 0,
          width: 0,
          height: 0,
          gtype: "gage",
          title: "gauge",
          label: "units",
          format: "{{value}}",
          min: 0,
          max: 10,
          colors: ["#00b500", "#e6e600", "#ca3838"],
          seg1: "",
          seg2: "",
          className: "",
        },
      }),
      graph.createNode({
        shape: "websocket in",
        data: {
          type: "websocket in",
          name: "Websocket In",
          "name": "",
          "server": "",
          "client": "",
        },
      }),
      graph.createNode({
        shape: "websocket out",
        data: {
          type: "websocket out",
          name: "Websocket out",
          "name": "",
          "server": "",
          "client": "",
        },
      }),
    ];
    stencil.load(templates);
    stencilInstance.value = stencil;
  }
  watch([getGraphFn, getStencilContainerFn], createStenceil);

  return {
    stencilInstance,
  };
}
