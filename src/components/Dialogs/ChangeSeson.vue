<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section class="row items-center">
          <q-avatar icon="brightness_medium" color="green" text-color="white" />
          <span class="q-ml-sm">Выбор сезона.</span>
        </q-card-section>
      <q-item>
        <!-- <q-item-section avatar>
          <q-icon color="deep-orange" name="brightness_medium" />
        </q-item-section> -->
    <q-item-section>
      <q-btn-toggle
        v-model="changeModel"
        spread
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="orange"
        color="blue-grey-1"
        text-color="primary"
        :options="[
          {label: 'Зима', value: 0},
          {label: 'Лето', value: 1}
        ]"
      />
        </q-item-section>
      </q-item>

        <q-card-actions align="right">
          <q-btn @click="exitDialog" flat label="Выйти" color="primary" v-close-popup />
          <q-btn @click="setUst" flat label="Применить" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </div>
</template>
<script>
// import { ref } from 'vue';

export default {
  data() {
    return {
      setDialog: this.dialog,
      confirm: this.dialog,
      changeModel: '0',
    };
  },
  watch: {
    dialog() {
      this.setDialog = this.dialog;
      this.confirm = this.dialog;
      this.changeModel = this.seson;
    },
  },
  props: {
    seson: Number,
    dialog: Boolean,
  },
  methods: {
    setUst() {
      this.$emit('setDialog', !this.setDialog);
      this.$socket.send(JSON.stringify({
        Message: 'setMain',
        seson: this.changeModel.toString(),
      }));
    },
    exitDialog() {
      this.$emit('setDialog', !this.setDialog);
    },
    ChangeUst() {
      return {
        Message: 'setMain',
        seson: this.changeModel.toString(),
      };
    },
    // setup(props) {
    //   return {
    //     changeModel: ref(props.seson),
    //   };
    // },
  },
};
</script>
