import Vue from "vue";
// import MqttBrokerEditor from "./MqttBrokerEditor.vue";
// import InfluxdbEditor from "./InfluxdbEditor.vue";
// import UiGroupEditor from "./UiGroupEditor.vue";
// import UiTabEditor from "./UiTabEditor.vue";

// Vue.component("MqttBrokerEditor", MqttBrokerEditor);
// Vue.component("InfluxdbEditor", InfluxdbEditor);
// Vue.component("UiGroupEditor", UiGroupEditor);
// Vue.component("UiTabEditor", UiTabEditor);


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
