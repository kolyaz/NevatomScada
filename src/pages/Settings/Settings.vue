<template>
<q-page>
    <div class="q-gutter-md q-pa-md" style="max-width:330px; min-width:330px">
      <q-input v-if="ustH" color="teal" filled v-model="ustH" label="Уставка нагрева C°">
        <template v-slot:prepend>
          <q-icon name="thermostat" color="deep-orange"/>
        </template>
      </q-input>

      <q-input v-if="ustC" color="teal" filled v-model="ustC" label="Уставка охлаждения C°">
        <template v-slot:prepend>
          <q-icon name="thermostat" color="blue-10" />
        </template>
      </q-input>

      <q-input v-if="pritVentNom" color="teal" filled v-model="pritVentNom" label="Номинальная сорость прит. вент.%">
        <template v-slot:prepend>
          <q-icon name="fast_rewind" color="green" />
        </template>

      </q-input>

      <q-input v-if="vitVentNom" color="teal" filled v-model="vitVentNom" label="Номинальная сорость выт. вент.%">
        <template v-slot:prepend>
          <q-icon name="fast_forward" color="green" />
        </template>
      </q-input>

    <q-card v-if="seson"  class="q-px-sm q-pb-md">
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="brightness_medium" color="green" text-color="white" /> -->
          <span class="q-ml-sm">Выбор сезона.</span>
        </q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-icon color="orange" name="brightness_medium" />
        </q-item-section>
    <q-item-section>
      <q-btn-toggle
        v-model="seson"
        spread
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="orange"
        color="blue-grey-1"
        text-color="primary"
        :options="[
          {label: 'Зима', value: '0'},
          {label: 'Лето', value: '1'}
        ]"
      />
        </q-item-section>
      </q-item>
      </q-card>

    </div>

  <div style="margin-top:40px; max-width: 330px" class=" q-gutter-md q-pa-md" >
    <div>
      <q-btn @click="SetSettings"   style="min-width: 330px" color="secondary" icon="done" label="Применить" />
    </div>
    <div>
      <q-btn style="min-width: 330px" text-color="black"  color="warning" icon="pending_actions" label="Настройка расписания" />
    </div>
      <div>
      <q-btn style="min-width: 330px" text-color="black"  color="warning" icon="settings_suggest" label="Дополнительные настройки ПЛК" />

    </div>
  </div>
  <div>
      <AlarmText
        :alarms="alarms"
     />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { serverMessageTry } from 'src/fun/websocket/websocket.js';
import { useQuasar } from 'quasar';
import AlarmText from 'components/AlarmText/AlarmText.vue';

export default defineComponent({
  name: 'PageSettings',
  components: {
    AlarmText,
  },
  data() {
    return {
      ustH: false,
      ustC: false,
      pritVentNom: false,
      vitVentNom: false,
      seson: false,
      mount: false,
      isLoad: false,
      alarms: '',
    };
  },
  methods: {
    OnMount() {
      const onMountSend = {
        getSettings: 1,
        Message: 'getSettings',
      };
      this.$socket.send(JSON.stringify(onMountSend));
    },
    IfName(data) {
      if (data) {
        return data;
      }
      return false;
    },
    WebSockets(mount) {
      const $q = useQuasar();
      try {
        if (mount) {
          this.$socket.onmessage = (data) => {
            const getJson = serverMessageTry(data.data);
            console.log(getJson);
            if (getJson.Settings) {
              this.ustH = this.IfName(getJson.Settings.ustH);
              this.ustC = this.IfName(getJson.Settings.ustC);
              this.pritVentNom = this.IfName(getJson.Settings.pritVentNom);
              this.seson = this.IfName(getJson.Settings.seson);
              this.vitVentNom = this.IfName(getJson.Settings.vitVentNom);
              console.log(this.ustH);
            }
            if (getJson.Message) {
              if (getJson.Message) {
                $q.notify({
                  message: getJson.Message,
                  color: 'secondary',
                  position: 'bottom',
                });
              }
            }
            if (getJson.PLCdata.alarms) {
              this.$global.$emit('PLCdata', getJson.PLCdata);
              this.alarms = getJson.PLCdata.alarms;
            }
          };
        }
        return '';
      } catch (error) {
        return '';
      }
    },
    SetSettings() {
      const sendMes = {
        setSettings: {
          ustH: this.ustH,
          ustC: this.ustC,
          pritVentNom: this.pritVentNom,
          vitVentNom: this.vitVentNom,
          seson: this.seson,
        },
        Message: 'setSettings',
      };
      this.$socket.send(JSON.stringify(sendMes));
    },
  },
  mounted() {
    this.OnMount();
    this.mount = true;
    this.WebSockets(this.mount);
  },
  setup() {
    return {
      // ustH: ref(''),
      // ustС: ref(''),
      // seson: ref(''),
      // pritVentNom: ref(''),
      // vitVentNom: ref(''),
    };
  },
});
</script>
<style scoped>
</style>
