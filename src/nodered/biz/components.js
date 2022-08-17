import camelCase from "camelcase";

// "mqtt out" --> "MqttOutEditor"
export function getComponentNameByType(type) {
  return `${camelCase(type, { pascalCase: true })}Editor`;
}
