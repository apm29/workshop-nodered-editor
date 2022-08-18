import "@antv/x6-vue-shape";
import { Graph } from "@antv/x6";

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
const components = import.meta.globEager('./*.vue');
const registered = Object.values(components).map(function (component) {
  Graph.registerNode(component.default.type, {
    inherit: "vue-shape",
    width: 150,
    height: 30,
    component: {
      components: {
        [component.default.name]: component.default,
      },
      render: h => h(component.default)
    },
    ports: {
      groups,
    },
  });
  return {
    type: component.default.type,
    name: component.default.name
  }
})
console.table(registered)
