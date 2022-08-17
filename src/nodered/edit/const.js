export const MsgTypes = [
  {
    text: "flow.",
    value: "flow",
  },
  {
    text: "global.",
    value: "global",
  },
  {
    text: "文字列",
    value: "str",
  },
  {
    text: "数字",
    value: "num",
  },
  {
    text: "布尔值",
    value: "bool",
  },
  {
    text: "JSON",
    value: "json",
  },
  {
    text: "二进制流",
    value: "bin",
  },
  {
    text: "时间戳",
    value: "date",
  },
  {
    text: "表达式",
    value: "jsonata",
  },
  {
    text: "环境变量",
    value: "env",
  },
  {
    text: "msg.",
    value: "msg",
  },
];

export const SwitchPropertyTypes = [
  {
    text: "flow.",
    value: "flow",
  },
  {
    text: "global.",
    value: "global",
  },
  {
    text: "表达式",
    value: "jsonata",
  },
  {
    text: "环境变量",
    value: "env",
  },
  {
    text: "msg.",
    value: "msg",
  },
];

export const MqttOutputTypes = [
  {
    value: "auto-detect",
    label: "自动检测 (已解析的JSON对象、字符串或buffer)",
  },
  {
    value: "auto",
    label: "自动检测 (字符串或buffer)",
  },
  {
    value: "buffer",
    label: "Buffer",
  },
  {
    value: "utf8",
    label: "字符串",
  },
  {
    value: "json",
    label: "解析的JSON对象",
  },
  {
    value: "base64",
    label: "Base64编码字符串",
  },
];
