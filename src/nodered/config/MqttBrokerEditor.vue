<template>
  <el-form size="mini" min="w-150">
    <el-form-item label="名称">
      <el-input v-model="config.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-tabs>
      <el-tab-pane label="连接">
        <el-form-item label="服务端">
          <el-input v-model="config.broker" placeholder="连接"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="config.port" placeholder="端口"></el-input>
        </el-form-item>
        <el-form-item label="自动连接">
          <el-checkbox v-model="config.autoConnect"></el-checkbox>
        </el-form-item>
        <el-form-item label="使用TLS">
          <el-checkbox v-model="config.usetls"></el-checkbox>
        </el-form-item>
        <el-form-item label="协议">
          <el-select v-model="config.protocolVersion" placeholder="协议">
            <el-option label="MQTT V3.1(legacy)" value="3"></el-option>
            <el-option label="MQTT V3.1.1" value="4"></el-option>
            <el-option label="MQTT V5" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户端ID">
          <el-input v-model="config.clientid" placeholder="不填写则为自动生成"></el-input>
        </el-form-item>
        <el-form-item label="KeepAlive计时(秒)">
          <el-input-number
            v-model="config.keepalive"
            placeholder="秒数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="使用新的会话(Session)">
          <el-checkbox v-model="config.cleansession"></el-checkbox>
        </el-form-item>
        <el-form-item label="会话(Session)过期时间(秒)">
          <el-input-number v-model="config.sessionExpiry"></el-input-number>
        </el-form-item>
        <el-form-item label="UserProperties(JSON)">
          <el-input v-model="config.userProps" placeholder="用户属性"></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="安全">
        <el-form-item label="用户名">
          <el-input v-model="config.credentials.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="config.credentials.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="消息">
        <el-collapse>
          <el-collapse-item title="连接时发送的消息(出生消息)" name="1">
            <LifecycleMessage
              :message="config.birthMsg"
              :topic="config.birthTopic"
              :qos="config.birthQos"
              :retain="config.birthRetain"
              :payload="config.birthPayload"
            ></LifecycleMessage>
          </el-collapse-item>
          <el-collapse-item title="断开连接前发送的消息(关闭消息)" name="2">
            <LifecycleMessage
              :message="config.closeMsg"
              :topic="config.closeTopic"
              :qos="config.closeQos"
              :retain="config.closeRetain"
              :payload="config.closePayload"
            ></LifecycleMessage>
          </el-collapse-item>
          <el-collapse-item title="意外断开连接时发送的消息(WILL消息)" name="3">
            <LifecycleMessage
              :message="config.willMsg"
              :topic="config.willTopic"
              :qos="config.willQos"
              :retain="config.willRetain"
              :payload="config.willPayload"
            ></LifecycleMessage>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <Saver @save="saveConfig(config)" @cancel="cancelSaveConfig(config)"> </Saver>
  </el-form>
</template>

<script setup>
import Saver from "./component/Saver.vue";
import LifecycleMessage from "./mqtt-broker/LifecycleMessage.vue";
const props = defineProps({
  config: Object,
});
if (!props.config.credentials) {
  props.config.credentials = {};
}
const saveConfig = inject("saveConfig");
const cancelSaveConfig = inject("cancelSaveConfig");
</script>

<style lang="scss" scoped></style>
