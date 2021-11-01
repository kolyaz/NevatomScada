<template>
<div class="q-pa-md">
    <q-table
      title="Карта Modbus переменных"
      :rows="rows"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-btn
          class="q-ml-sm"
          color="secondary"
          icon-right="archive"
          label="Экспорт в csv"
          no-caps
          @click="exportTable"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name">
              <q-input v-model="props.row.name" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="desc" :props="props">
            {{ props.row.desc }}
            <q-popup-edit v-model="props.row.desc" title="Обновить название" buttons label-set="Сохранить" label-cancel="Выйти">
              <q-input type="textarea" v-model="props.row.desc" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="reg" :props="props">
            <div class="text-pre-wrap">{{ props.row.reg }}</div>
            <q-popup-edit v-model="props.row.reg" buttons label-set="Сохранить" label-cancel="Выйти">
              <q-input type="number" v-model="props.row.reg" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="type" :props="props">
            {{ props.row.type }}
            <q-popup-edit v-model="props.row.type" title="Изменить тип" buttons persistent label-set="Сохранить" label-cancel="Выйти">
              <q-select  v-model="props.row.type" :options="options" label="Тип данных" />
              <!-- <q-input type="textarea" v-model="props.row.type" dense autofocus hint="Use buttons to close" /> -->
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile, useQuasar } from 'quasar';

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val;

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Наименование тэга ',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'desc', align: 'center', label: 'Наименование функции', field: 'desc', sortable: true,
  },
  {
    name: 'reg', label: 'Адрес регистра', field: 'reg', sortable: true,
  },
  {
    name: 'type', label: 'Тип данных', field: 'type', sortable: true,
  },
//   { name: 'protein', label: 'Protein (g)', field: 'protein' },
];

export default {
  data() {
    return {
    };
  },
  methods: {
    // tags() {
    //   this.$emit('tags', this.props);
    // },
    exportTable() {
      const $q = useQuasar();
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))].concat(
        this.rows.map((row) => this.columns.map((col) => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format,
        )).join(',')),
      ).join('\r\n');

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv',
      );

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        });
      }
    },

  },
  props: {
    rows: Array,
  },
  mounted() {
  },
  setup() {
    return {
      columns,
      //   rows: ref(rows),
      options: [
        'int', 'float', 'long',
      ],
    };
  },
};
</script>

<style  scoped>

</style>
