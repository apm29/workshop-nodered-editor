import { createNodeId } from "./id.js";
export function createConfigByType(type, id) {
  switch (type) {
    case "mqtt-broker":
      return {
        id: id || createNodeId(),
        type: "mqtt-broker",
        name: "",
        broker: "",
        port: "",
        clientid: "",
        autoConnect: true,
        usetls: false,
        protocolVersion: "4",
        keepalive: "60",
        cleansession: true,
        birthTopic: "",
        birthQos: "0",
        birthPayload: "",
        birthMsg: {},
        closeTopic: "",
        closeQos: "0",
        closePayload: "",
        closeMsg: {},
        willTopic: "",
        willQos: "0",
        willPayload: "",
        willMsg: {},
        userProps: "",
        sessionExpiry: "",
        credentials: {
          user: "",
          password: "",
        },
      };
    case "influxdb":
      return {
        id: id || createNodeId(),
        type: "influxdb",
        hostname: "127.0.0.1",
        port: "8086",
        protocol: "http",
        database: "database",
        name: "",
        usetls: false,
        tls: "",
        precisionV18FluxV20: "s",
        influxdbVersion: "1.x",
        url: "http://localhost:8086",
        rejectUnauthorized: true,
        credentials: {
          username: "",
          password: "",
          token: "",
        },
      };
    case "ui_group":
      return {
        id: id || createNodeId(),
        type: "ui_group",
        tab: "",
        order: 1,
        disp: true,
        width: "6",
        collapse: false,
        className: "",
      };
    case "ui_tab":
      return {
        id: id || createNodeId(),
        type: "ui_tab",
        name: "Home",
        icon: "dashboard",
        disabled: false,
        hidden: false,
      };
    default:
      return {
        id: id || createNodeId(),
        type: type,
      };
  }
}

export function getConfigNameByType(type) {
  switch (type) {
    case "mqtt-broker":
      return "Mqtt连接配置";
    case "influxdb":
      return "InfluxDB连接配置";
    case "ui_group":
      return "展示页Group配置";
    case "ui_tab":
      return "展示页Tab配置";
    default:
      return "配置";
  }
}
