<template>
  <q-item
    :to="link"
    exact
    v-ripple
    :active="active"
    active-class="text-orange"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-badge class="blink" v-if="badge"  color="red" >{{badge}}</q-badge>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <!-- <q-item-label caption>
        {{ caption }}
      </q-item-label> -->
    </q-item-section>
  </q-item>
  <q-separator spaced inset />
</template>

<script>
//    clickable target="_blank" для q-item
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  data() {
    return {
      badgek: '',
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },

    badge: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  },
});
</script>
