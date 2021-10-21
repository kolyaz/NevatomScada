<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section class="row items-center">
          <q-avatar icon="thermostat" color="green" text-color="white" />
          <span class="q-ml-sm">Уставка температуры.</span>
        </q-card-section>
      <q-item>
        <!-- <q-item-section avatar>
          <q-icon color="deep-orange" name="brightness_medium" />
        </q-item-section> -->
        <q-item-section>
          <q-slider
            v-model="slideVol"
            :min="0"
            :max="40"
            label
            color="deep-orange"
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
</template>
<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      setDialog: this.dialog,
      confirm: this.dialog,
      ust: null,
    };
  },
  watch: {
    dialog() {
      this.setDialog = this.dialog;
      this.confirm = this.dialog;
    },
    seson() {
      if (this.seson === '1') {
        this.slideVol = this.ustC;
      }
      if (this.seson === '0') {
        this.slideVol = this.ustH;
      }
    },
  },
  props: {
    seson: String,
    ustH: String,
    ustC: String,
    dialog: Boolean,
  },
  methods: {
    setUst() {
      const ust = this.ChangeUst();
      this.$emit('setDialog', !this.setDialog);
      this.$socket.send(JSON.stringify(ust));
    },
    exitDialog() {
      this.$emit('setDialog', !this.setDialog);
    },
    ChangeUst() {
      if (this.seson === '1') {
        return {
          Message: 'setMain',
          ustC: this.slideVol,
        };
      }
      if (this.seson === '0') {
        return {
          Message: 'setMain',
          ustH: this.slideVol,
        };
      }
      return this.slideVol;
    },
  },
  setup(props) {
    if (props.seson === '1') {
      return {
        slideVol: ref(props.ustC),
        sliders: ref(false),
        // confirm: ref(false),
      };
    }
    if (props.seson === '0') {
      return {
        slideVol: ref(props.ustH),
        sliders: ref(false),
        // confirm: ref(false),
      };
    }

    return {
      slideVol: ref(10),
      sliders: ref(false),
    //   confirm: ref(false),
    };
  },
};
</script>
