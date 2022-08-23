import {
  getPaged485Hub,
  getPaged485Net,
  getPagedCollector,
  getPagedElectricityBox,
  getPagedSensor,
  getPagedSwitch,
  getPagedRFIDScanner,
  getPagedRFIDReader,
} from "~/api/device/paged.js";

export const DeviceTopographyTables = {
  HUB: "topo_485hub",
  COLLECTOR: "topo_collector",
  EBOX: "topo_electric_box",
  SENSOR: "topo_sensor",
  SWITCH: "topo_switch",
  SCANNER: "index_info_one",
  READER: "index_info",
  NET: "topo_485net",
};

export function useDeviceTopographyTableNames() {
  const topographyTables = [
    {
      name: "485Hub",
      tableName: DeviceTopographyTables.HUB,
    },
    {
      name: "485转网口",
      tableName: DeviceTopographyTables.NET,
    },
    {
      name: "采集器",
      tableName: DeviceTopographyTables.COLLECTOR,
    },
    {
      name: "电箱",
      tableName: DeviceTopographyTables.EBOX,
    },
    {
      name: "传感器",
      tableName: DeviceTopographyTables.SENSOR,
    },
    {
      name: "交换机",
      tableName: DeviceTopographyTables.SWITCH,
    },
    {
      name: "RFID扫描设备(入库)",
      tableName: DeviceTopographyTables.SCANNER,
    },
    {
      name: "RFID扫描设备(投料)",
      tableName: DeviceTopographyTables.READER,
    },
  ];
  return {
    topographyTables,
  };
}

export function use485HubDict() {
  const dict = ref([]);
  async function get485HubDict() {
    const { data } = await getPaged485Hub({
      pageNo: 1,
      pageSize: 99999,
    });
    dict.value = data.records || [];
  }
  return {
    get485HubDict,
    hubDict: dict,
  };
}

export function use485NetDict() {
  const dict = ref([]);
  async function get485NetDict() {
    const { data } = await getPaged485Net({
      pageNo: 1,
      pageSize: 99999,
    });
    dict.value = data.records || [];
  }
  return {
    get485NetDict,
    netDict: dict,
  };
}

export function useCollectorDict() {
  const dict = ref([]);
  async function getCollectorDict() {
    const { data } = await getPagedCollector({
      pageNo: 1,
      pageSize: 99999,
    });
    dict.value = data.records || [];
  }
  return {
    getCollectorDict,
    collectorDict: dict,
  };
}

export function useElectricityBoxDict() {
  const dict = ref([]);
  async function getElectricityBoxDict() {
    const { data } = await getPagedElectricityBox({
      pageNo: 1,
      pageSize: 99999,
    });
    dict.value = data.records || [];
  }
  return {
    getElectricityBoxDict,
    electricityBoxDict: dict,
  };
}

export function useSensorDict() {
  const dict = ref([]);
  async function getSensorDict() {
    const { data } = await getPagedSensor({
      pageNo: 1,
      pageSize: 99999,
    });
    dict.value = data.records || [];
  }
  return {
    getSensorDict,
    sensorDict: dict,
  };
}

export function useSwitchDict() {
  const dict = ref([]);
  async function getSwitchDict() {
    const { data } = await getPagedSwitch({
      pageNo: 1,
      pageSize: 99999,
    });
    dict.value = data.records || [];
  }
  return {
    getSwitchDict,
    switchDict: dict,
  };
}

export function useScannerDict() {
  const dict = ref([]);
  async function getScannerDict() {
    const { data } = await getPagedRFIDScanner({
      pageNo: 1,
      pageSize: 99999,
    });
    dict.value = data.records || [];
  }
  return {
    getScannerDict,
    scannerDict: dict,
  };
}

export function useReaderDict() {
  const dict = ref([]);
  async function getReaderDict() {
    const { data } = await getPagedRFIDReader({
      pageNo: 1,
      pageSize: 99999,
    });
    dict.value = data.records || [];
  }
  return {
    getReaderDict,
    readerDict: dict,
  };
}
