import "@antv/x6-vue-shape";
import { Graph } from "@antv/x6";
import Comment from "./Comment.vue";
import Debug from "./Debug.vue";
import MqttOut from "./MqttOut.vue";
import MqttIn from "./MqttIn.vue";
import Inject from "./Inject.vue";
import Complete from "./Complete.vue";
import Delay from "./Delay.vue";
import Function from "./Function.vue";
import SwitchNode from "./SwitchNode.vue";
import Exec from "./Exec.vue";
import Status from "./Status.vue";
import HttpRequest from "./HttpRequest.vue";
import InfluxdbIn from "./InfluxdbIn.vue";
import InfluxdbOut from "./InfluxdbOut.vue";
import UiGauge from "./UiGauge.vue";
const groups = {
  out: {
    position: "right",
    attrs: {
      circle: {
        r: 6,
        magnet: true,
        stroke: "#959b9b",
        strokeWidth: 2,
        fill: "#fff",
      },
    },
    zIndex: 10,
  },
  in: {
    position: "left",
    attrs: {
      circle: {
        r: 6,
        magnet: true,
        stroke: "#959b9b",
        strokeWidth: 2,
        fill: "#fff",
      },
    },
    zIndex: 10,
  },
};
Graph.registerNode("comment", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      Comment,
    },
    render: h => h(Comment)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("debug", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      Debug,
    },
    render: h => h(Debug)
  },
  ports: {
    groups,
  },
});

Graph.registerNode("mqtt in", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      mqttin: MqttIn,
    },
    render: h => h(MqttIn)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("mqtt out", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      mqttout: MqttOut,
    },
    render: h => h(MqttOut)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("inject", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      Inject,
    },
    render: h => h(Inject)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("complete", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      Complete,
    },
    render: h => h(Complete)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("status", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      Status,
    },
    render: h => h(Status)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("delay", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      Delay,
    },
    render: h => h(Delay)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("function", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      Function,
    },
    render: h => h(Function)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("switch", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      switchnode: SwitchNode,
    },
    render: h => h(SwitchNode)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("http request", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      httprequest: HttpRequest,
    },
    render: h => h(HttpRequest)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("influxdb in", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      influxdbin: InfluxdbIn,
    },
    render: h => h(InfluxdbIn)
  },
  ports: {
    groups,
  },
});
Graph.registerNode("influxdb out", {
  inherit: "vue-shape",
  width: 150,
  height: 30,
  component: {
    components: {
      influxdbout: InfluxdbOut,
    },
    render: h => h(InfluxdbOut)
  },
  ports: {
    groups,
  },
});

Graph.registerNode("exec", {
  inherit: "vue-shape",
  width: 150,
  height: 65,
  component: {
    components: {
      Exec,
    },
    render: h => h(Exec)
  },
  ports: {
    groups,
  },
});

Graph.registerNode("ui_gauge", {
  inherit: "vue-shape",
  width: 150,
  height: 65,
  component: {
    components: {
      uigauge: UiGauge,
    },
    render: h => h(UiGauge)
  },
  ports: {
    groups,
  },
});
