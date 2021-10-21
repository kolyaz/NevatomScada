<template>
<div class="q-pa-md " style="max-width: 400px">
    <q-form
      class="q-gutter-md form"
    >
        <q-input v-model="login"
          filled
          label="Имя роутера "
          hint="введите имя wifi роутера"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'введите  логин']"
        >
          <template v-slot:append>
            <q-icon name="router" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          label="Пароль "
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'введите корректный пароль']"
          filled :type="isPwd ? 'password' : 'text'" hint="введите  пароль wifi роутера"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
            <!-- <q-icon name="https" /> -->
          </template>
        </q-input>

      <div>
        <q-btn label="Сохранить"  color="secondary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      login: '',
      password: '',
    };
  },
  props: {
    Login: String,
    Password: String,
  },
  setup() {
    return {
      pass: ref(''),
      isPwd: ref(true),
    };
  },
};
</script>

<style  scoped>

</style>
