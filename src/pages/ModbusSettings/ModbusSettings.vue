<template>

 <q-page class="">
    <div class="ModbusConf">
      <ModbusConf
      :rows="conf"
      />
    </div>

    <div class="modbusTags">
        <ModbusTags
        :rows="tags"
        />
    </div>

    <div class="q-pa-md">
        <q-btn
        class="q-ml-sm btn text-black"
          color="warning"
          icon-right="save"
          label="Сохранить настройки"
          no-caps
          @click="setModbusSettings"
        />
    </div>

    <div>
        <AlarmText
        :alarms="alarms"
        />
    </div>
 </q-page>

</template>

<script>
import AlarmText from 'components/AlarmText/AlarmText.vue';
import { serverMessageTry } from 'src/fun/websocket/websocket.js';
import { useQuasar } from 'quasar';
import ModbusTags from './ModbusTags.vue';
import ModbusConf from './ModbusConf.vue';

export default {
  name: 'PageModbusSettings',
  components: {
    AlarmText,
    ModbusTags,
    ModbusConf,
  },
  data() {
    return {
      modbusData: {},
      isLoad: false,
      alarms: '',
      conf: [{ connOption: { host: '', port: '' } }],
      tags: [{}],
    };
  },
  methods: {
    getModbusSettings() {
      const onMountSend = {
        getModbusSettings: 1,
        Message: 'getModbusSettings',
      };
      this.$socket.send(JSON.stringify(onMountSend));
    },
    setModbusSettings() {
      if (this.tags && this.conf) {
        this.modbusData.tags = this.tags;
        this.modbusData.conf = this.conf;
        this.$socket.send(JSON.stringify({
          setModbusSettings: this.modbusData,
          Message: 'setModbusSettings',
        }));
      }
    },
    WebSockets() {
      const $q = useQuasar();
      try {
        this.$socket.onmessage = (data) => {
          const getJson = serverMessageTry(data.data);
          //   console.log(getJson);
          if (getJson.Message) {
            $q.notify({
              message: getJson.Message,
              color: 'secondary',
              position: 'bottom',
            });
          }
          if (getJson.errorMessage) {
            $q.notify({
              message: getJson.errorMessage,
              color: 'negative',
              position: 'bottom',
            });
          }
          if (getJson.modbusSettings) {
            this.modbusData = getJson.modbusSettings;
            this.conf = getJson.modbusSettings.conf;
            this.tags = getJson.modbusSettings.tags;
          }
          if (getJson.PLCdata.alarms) {
            // this.$global.$emit('PLCdata', getJson.PLCdata);
            this.alarms = getJson.PLCdata.alarms;
          }
        };

        return '';
      } catch (error) {
        return '';
      }
    },
  },
  mounted() {
    this.WebSockets();
    this.getModbusSettings();
  },
  setup() {
    return {};
  },
};
</script>

<style  scoped>

</style>
