import Vue from "vue";
// import CompleteEditor from "./CompleteEditor.vue";
// import DebugEditor from "./DebugEditor.vue";
// import DelayEditor from "./DelayEditor.vue";
// import FunctionEditor from "./FunctionEditor.vue";
// import InjectEditor from "./InjectEditor.vue";
// import MqttOutEditor from "./MqttOutEditor.vue";
// import MqttInEditor from "./MqttInEditor.vue";
// import StatusEditor from "./StatusEditor.vue";
// import SwitchEditor from "./SwitchEditor.vue";
// import InfluxdbOutEditor from "./InfluxdbOutEditor.vue";
// import UiGaugeEditor from "./UiGaugeEditor.vue";

// Vue.component("CompleteEditor", CompleteEditor);
// Vue.component("DebugEditor", DebugEditor);
// Vue.component("DelayEditor", DelayEditor);
// Vue.component("FunctionEditor", FunctionEditor);
// Vue.component("InjectEditor", InjectEditor);
// Vue.component("MqttInEditor", MqttInEditor);
// Vue.component("MqttOutEditor", MqttOutEditor);
// Vue.component("StatusEditor", StatusEditor);
// Vue.component("SwitchEditor", SwitchEditor);
// Vue.component("InfluxdbOutEditor", InfluxdbOutEditor);
// Vue.component("UiGaugeEditor", UiGaugeEditor);


const components = import.meta.globEager('./*.vue');
const registered = []
for (const path in components) {
  const result = path.match(/.*\/(.+).vue$/);
  if (result) {
    const name = result[1];
    const component = components[path];
    Vue.component(name, component.default);
    registered.push(name)
  }
}

console.table(registered)
