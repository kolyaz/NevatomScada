<template>
    <Spinner v-if="!isLoad"/>
    <div v-if="isLoad">
      <div class="">
        <AlarmPage
          :alarmsMagazine="alarmsMagazine"
        />
      </div>
      <div>
        <AlarmText
          :alarms="alarms"
        />
      </div>

    </div>

</template>

<script>
import { defineComponent } from 'vue';
import AlarmText from 'components/AlarmText/AlarmText.vue';
import { serverMessageTry } from 'src/fun/websocket/websocket.js';
import { useQuasar } from 'quasar';
import AlarmPage from './AlarmPage.vue';
import Spinner from '../../components/Spinner/Spinner.vue';

export default defineComponent({
  name: 'AlarmMagazine',
  data() {
    return {
      mount: false,
      alarms: '',
      PLCdata: null,
      isLoad: false,
      alarmsMagazine: [],
    };
  },
  components: {
    AlarmText,
    AlarmPage,
    Spinner,
  },
  methods: {
    OnMount() {
      try {
        this.$socket.send(JSON.stringify({
          getAlarms: 1,
          Message: 'getAlarms',
        }));
        this.isLoad = true;
        return true;
      } catch (error) {
        this.isLoad = false;
        return false;
      }
    },
    WebSockets() {
      const $q = useQuasar();
      try {
        this.$socket.onmessage = (data) => {
          const getJson = serverMessageTry(data.data);
          if (getJson.Message) {
            if (getJson.Message) {
              $q.notify({
                message: getJson.Message,
                color: 'secondary',
                position: 'bottom',
              });
            }
          }
          if (getJson.alarmsMagazine) {
            this.alarmsMagazine = getJson.alarmsMagazine;
            console.log(getJson);
          }
          if (getJson.PLCdata) {
            this.$global.$emit('PLCdata', getJson.PLCdata);
            this.PLCdata = getJson.PLCdata;
            this.alarms = getJson.PLCdata.alarms;
          }
        };

        return '';
      } catch (error) {
        return '';
      }
    },

  },
  watch: {
    alarms() {

    },
  },
  mounted() {
    this.OnMount();
    this.WebSockets();
  },
});
</script>
<style scoped>
  .alarmsMagazine{
  width: 100%;
  min-width:600
  px;
  height: auto;
}
</style>
