<template>
  <q-layout view="hHf LpR fff" >
    <q-header  class="bg-white">
      <q-toolbar >
        <q-btn
          class="bg-grey-5"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
         <Header/>
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="left"
    >
      <q-list >
        <q-item-label
          header
        >
          <!-- Essential Links -->
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container  :style=" `width:100vw;`">
      <!-- <Spinner/> -->
      <router-view
      @alarmText="genBadge"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import Header from 'components/Header/Header.vue';
import EssentialLink from 'src/components/Menu/EssentialLink.vue';

export default {
  name: 'MainLayout',
  data() {
    return {
      isWebsocket: false,
      badge: null,
      linksList: [
        {
          title: 'Главная',
          caption: 'Главная',
          icon: 'house',
          link: '/',
        },
        {
          title: 'Основные настройки',
          caption: 'Основные настройки',
          icon: 'settings',
          link: 'settings',
        },
        {
          title: 'Графики',
          caption: 'Графики',
          icon: 'trending_up',
          link: 'trends',
        },
        {
          title: 'Журнал аварий',
          caption: 'Журнал аварий',
          icon: 'warning',
          link: 'alarms',
          badge: null,
        },
        {
          title: 'Сетевые настройки',
          caption: 'Сетевые настройки',
          icon: 'public',
          link: 'net_settings',
        },
      ],
    };
  },

  components: {
    EssentialLink,
    Header,
  },
  methods: {
    genBadge() {
      this.$global.$on('PLCdata', (data) => {
        const arr = data.alarms.split(';');
        let i = 0;
        for (let index = 0; index < arr.length; index++) {
          if (arr[index]) {
            i++;
          }
        }
        this.linksList[3].badge = i;
      });
    },
  },
  mounted() {
    this.genBadge();
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      // essentialLinks: this.linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
