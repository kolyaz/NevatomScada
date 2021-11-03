<template>
<div class="q-pa-md">
    <q-table
      title="Сетевые настройки Modbus"
      :rows="rows"
      :columns="columns"
      row-key="name"
      binary-state-sort
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="proto" :props="props">
            {{ props.row.proto }}
            <q-popup-edit v-model="props.row.proto">
              <q-select  v-model="props.row.proto" :options="optionsType" label="Тип cоединения" />
            </q-popup-edit>
          </q-td>
          <q-td key="speed" :props="props">
            {{ props.row.speed }}
            <q-popup-edit v-model="props.row.speed" title="Скорость передачи данных">
              <q-select  v-model="props.row.speed" :options="optionsSpeed" label="скорость" />
            </q-popup-edit>
          </q-td>
          <q-td key="mode" :props="props">
            <div class="text-pre-wrap">{{ props.row.mode }}</div>
            <q-popup-edit v-model="props.row.mode" title="Режим передачи данных">
              <q-select  v-model="props.row.mode" :options="optionsMode" label="режим" />
            </q-popup-edit>
          </q-td>
          <q-td key="address" :props="props">
            {{ props.row.address}}
            <q-popup-edit v-model="props.row.address" title="Адрес устройства" >
              <q-input  v-model="props.row.address" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="host" :props="props">
            {{ props.row.connOption.host }}
            <q-popup-edit v-model="props.row.connOption.host" title="Изменить адрес хоста"
            mask="###/##"
             >
              <q-input
                v-model="props.row.connOption.host"
                dense autofocus
                />
            </q-popup-edit>
          </q-td>
          <q-td key="port" :props="props">
            {{ props.row.connOption.port }}
            <q-popup-edit v-model="props.row.connOption.port" title="Изменить номер порта">
              <q-input
              type="number"
              v-model="props.row.connOption.port"
              dense
              autofocus
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
const columns = [
  {
    name: 'proto',
    required: true,
    label: 'Тип ',
    align: 'left',
    field: (row) => row.proto,
    format: (val) => `${val}`,
  },
  {
    name: 'speed',
    align: 'center',
    label: 'Скорость',
    field: 'speed',
  },
  {
    name: 'mode',
    label: 'Режим',
    field: 'mode',
  },
  {
    name: 'address',
    label: 'Адрес',
    field: 'address',
  },
  {
    name: 'host',
    label: 'Хост',
    field: 'host',
  },
  {
    name: 'port',
    label: 'Порт',
    field: 'port',
  },

];

export default {
  data() {
    return {
    };
  },
  methods: {

  },
  props: {
    rows: Array,
  },
  setup() {
    return {
      columns,
      //   rows: ref(rows),
      optionsType: [
        'RTU', 'TCP',
      ],
      optionsSpeed: [
        '1200', '2400', '4800', '9600', '19200', '38400', '115200',
      ],
      optionsMode: [
        '8N1', '8E1', '8O1', '8N2',
      ],
    };
  },
};
</script>

<style  scoped>

</style>
