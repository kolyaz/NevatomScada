<template>
  <q-page  class="some">
    <div class="q-pa-md" style="max-width:330px">
    <div class="q-gutter-md" style="min-width: 330px">
      <q-input
        color="teal"
        filled
        v-model="loginSTA"
        label="Имя роутера "
        hint="введите имя роутера "
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'введите  имя роутера']">
        <template v-slot:prepend>
          <q-icon name="router" color="orange"/>
        </template>
      </q-input>

      <q-input
      color="teal"
      v-model="passwordSTA"
      label="Пароль"
      filled :type="isPwdS ? 'password' : 'text'" hint="введите  пароль"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'введите  пароль']">
        <template v-slot:prepend>
          <q-icon name="wifi_lock" color="orange" />
        </template>
        <template v-slot:append>
            <q-icon
              :name="isPwdS ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdS = !isPwdS"
            />
            <!-- <q-icon name="https" /> -->
        </template>
      </q-input>

      <q-input
      color="teal"
      filled
      v-model="loginAP"
      label="Имя точки доступа"
      hint="введите новое имя точки доступа"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'введите имя точки доступа']">
        <template v-slot:prepend>
          <q-icon name="cell_wifi" color="green" />
        </template>
      </q-input>

      <q-input
      color="teal"
      v-model="passwordAP"
      label="Пароль точки доступа"
      filled :type="isPwdA ? 'password' : 'text'" hint="введите  пароль"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'введите  пароль']">
        <template v-slot:prepend>
          <q-icon name="lock" color="green" />
        </template>
        <template v-slot:append>
            <q-icon
              :name="isPwdA ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdA = !isPwdA"
            />
            <!-- <q-icon name="https" /> -->
        </template>
      </q-input>

      <q-input
      color="teal"
      filled
      v-model="loginNet"
      label="Имя удаленного доступа"
      hint="введите имя удаленного доступа"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'введите имя удаленного доступа']">
        <template v-slot:prepend>
          <q-icon name="how_to_reg" color="deep-orange" />
        </template>
      </q-input>

      <q-input
      color="teal"
      v-model="passwordNet"
      label="Пароль удаленного доступа"
      filled :type="isPwd ? 'password' : 'text'" hint="введите  пароль"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'введите  пароль']">
        <template v-slot:prepend>
          <q-icon name="vpn_lock" color="deep-orange" />
        </template>
        <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
            <!-- <q-icon name="https" /> -->
        </template>
      </q-input>

    </div>

    <div style="margin-top:40px" class=" q-gutter-md">
      <div>
        <q-btn @click="SetNetSettings"   style="min-width: 330px" color="secondary" icon="done" label="Применить" />
      </div>
    </div>

      <div style="margin-top:40px" class=" q-gutter-md">
      <div>
        <q-btn @click="GetModbusPage" class="text-black"  style="min-width: 330px" color="warning" icon="hub" label="Настройки Modbus" />
      </div>
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
import { defineComponent, ref } from 'vue';
import { serverMessageTry } from 'src/fun/websocket/websocket.js';
import { useQuasar } from 'quasar';
import AlarmText from 'components/AlarmText/AlarmText.vue';

export default defineComponent({
  name: 'PageNetSettings',
  components: {
    AlarmText,
  },
  data() {
    return {
      loginSTA: '',
      passwordSTA: '',
      loginAP: '',
      passwordAP: '',
      loginNet: '',
      passwordNet: '',
      isLoad: false,
      alarms: '',
      modbusLink: '/modbus_settings',
      q: useQuasar(),
    };
  },
  methods: {
    OnMount() {
      const onMountSend = {
        getNetSettings: 1,
        Message: 'getNetSettings',
      };
      this.$socket.send(JSON.stringify(onMountSend));
    },
    IfName(data) {
      if (data) {
        return data;
      }
      console.log(data);
      return '';
    },
    WebSockets(mount) {
      // const $q = useQuasar();
      try {
        if (mount) {
          this.$socket.onmessage = (data) => {
            const getJson = serverMessageTry(data.data);
            // console.log(getJson);
            if (getJson.Message) {
              this.q.notify({
                message: getJson.Message,
                color: 'secondary',
                position: 'bottom',
              });
            }
            if (getJson.NetSettings) {
              this.loginSTA = this.IfName(getJson.NetSettings.loginSTA);
              this.passwordSTA = this.IfName(getJson.NetSettings.passwordSTA);
              this.loginAP = this.IfName(getJson.NetSettings.loginAP);
              this.passwordAP = this.IfName(getJson.NetSettings.passwordAP);
              this.loginNet = this.IfName(getJson.NetSettings.loginNet);
              this.passwordNet = this.IfName(getJson.NetSettings.passwordNet);
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
    SetNetSettings() {
      this.q.dialog({
        title: 'Сетевые настройки',
        message: 'Изменить сетевые настройки ???',
        cancel: {
          push: false,
          label: 'Выход',
        },
        ok: {
          push: false,
          label: 'Да',
        },
      }).onOk(() => {
        const sendMes = {
          setNetSettings: {
            loginSTA: this.loginSTA,
            passwordSTA: this.passwordSTA,
            loginAP: this.loginAP,
            passwordAP: this.passwordAP,
            loginNet: this.loginNet,
            passwordNet: this.passwordNet,
          },
          Message: 'setNetSettings',
        };
        this.$socket.send(JSON.stringify(sendMes));
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      });
    },
    GetModbusPage() {
      this.q.dialog({
        title: 'Настройки Modbus',
        message: 'Введите пароль администратора',
        prompt: {
          model: '',
          type: 'text', // optional
          isValid: (val) => val.length > 1,
        },
        cancel: {
          push: false,
          label: 'Выход',
        },
        ok: {
          push: false,
          label: 'Войти',
        },
      }).onOk((data) => {
        if (data === '312') {
          console.log('access assepted');
          this.$router.push('modbus_settings');
          return;
        }
        this.q.notify({
          message: 'Не верный пароль!',
          color: 'negative',
          position: 'bottom',
        });
        console.log('access denied');
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
    },
  },
  mounted() {
    this.OnMount();
    this.mount = true;
    this.WebSockets(this.mount);
  },
  setup() {
    return {
      isPwd: ref(true),
      isPwdS: ref(true),
      isPwdA: ref(true),
    };
  },
});
</script>
