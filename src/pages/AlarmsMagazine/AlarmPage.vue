<template>
    <div class="q-pa-md">
        <q-table
        card-class=" text-black"
        class=""
        title="Журнал аварий"
        dense
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-label="`Записей на страницу`"
        v-model:pagination="pagination"
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
        </q-table>
       <div class="flex">
        <q-btn
        class="q-ml-sm btn "
          color="warning text-black"
          icon-right="restart_alt"
          label="Сбросить активные"
          no-caps
          @click="resetAlarms"
        />
        <q-btn
        class="q-ml-sm btn"
          color="red"
          icon-right="delete"
          label="Очистить журнал"
          no-caps
          @click="deleteAlarms"
        />
        </div>
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

export default {
  name: 'AlarmPage',
  data() {
    return {
      q: useQuasar(),
      pagination: {
        sortBy: 'asc',
        descending: false,
        page: 1,
        rowsPerPage: 8,
      },
      columns: [
        {
          name: 'name',
          required: true,
          label: '№ id',
          align: 'left',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'time', align: 'center', label: 'Время', field: 'time', sortable: true,
        },
        {
          name: 'text', align: 'left', label: 'Наименование аварии', field: 'text', sortable: true,
        },
      ],
      rows: [
        {
          id: '',
          time: '',
          text: '',
        },
      ],
    };
  },
  props: {
    alarmsMagazine: Array,
  },
  watch: {
    alarmsMagazine() {
      this.createTable();
    },
  },
  components: {
  },
  methods: {
    createTable() {
      if (this.alarmsMagazine) {
        this.rows = this.alarmsMagazine;
      }
    },
    exportTable() {
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
        this.q.notify({
          message: 'Нет доступа...',
          color: 'negative',
          icon: 'warning',
        });
      }
    },

    resetAlarms() {
      this.$socket.send(JSON.stringify({
        resetAlarms: 1,
        Message: 'resetAlarms',
      }));
    },
    deleteAlarms() {
      this.q.dialog({
        title: 'Очистка журнала',
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
          label: 'Очистка',
        },
      }).onOk((data) => {
        if (data === '312') {
          console.log('access assepted');
          this.$socket.send(JSON.stringify({
            deleteAlarms: 1,
            Message: 'deleteAlarms',
          }));
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
    this.createTable();
  },
};
</script>
<style  scoped>
 .btn{
     min-width: 200px;
     margin-top: 3vh;
 }
</style>>
