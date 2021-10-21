<template>
    <div class="chart" id="chart">
      <apexchart
        type="line"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div >
      <AlarmText
        :alarms="alarms"
     />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { serverMessageTry } from 'src/fun/websocket/websocket.js';
import VueApexCharts from 'vue3-apexcharts';
import moment from 'moment';
import AlarmText from 'components/AlarmText/AlarmText.vue';
// import LineChart from './lineChart.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      cat: null,
      alarms: '',
      chartOptions: {
        chart: {
          id: 'chart',
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
          animations: {
            enabled: true,
            easing: 'easeout',
            speed: 100,
            animateGradually: {
              enabled: false,
              delay: 10,
            },
            // dynamicAnimation: {
            //   speed: 1000,
            // },
          },
        },
        xaxis: {
          categories: [''],
        },
        title: {
          text: 'График температуры',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
        },
        markers: {
          size: 0,
        },
        stroke: {
          curve: 'smooth',
        },
        colors: ['#FF0000', '#008000', '#00CED1', '#FFFF00'],
      },
      series: [
        {
          name: 'Температура притока',
          data: [],
        },
        {
          name: 'Температура вытяжки',
          data: [],
        },
        {
          name: 'Температура наружняя',
          data: [],
        },
        {
          name: 'Температура комнатная',
          data: [],
        },
      ],
    };
  },
  mounted() {
    this.$socket.onmessage = (data) => {
      const getJson = serverMessageTry(data.data);
      console.log(getJson);
      const lengthChart = 10;
      this.getChart(0, lengthChart, +getJson.PLCdata.tPritok + this.getRandomArbitrary());
      this.getChart(1, 10, +getJson.PLCdata.tVyt + this.getRandomArbitrary());
      this.getChart(2, 10, +getJson.PLCdata.tNar + this.getRandomArbitrary());
      this.getChart(3, 10, +getJson.PLCdata.tRoom + this.getRandomArbitrary());
      this.getCategories(lengthChart, moment().format('HH:mm:ss'));
      if (getJson.PLCdata.alarms) {
        this.$global.$emit('PLCdata', getJson.PLCdata);
        this.alarms = getJson.PLCdata.alarms;
      }
    };
  },
  methods: {
    getCategories(lengthChart, data) {
      if (this.chartOptions.xaxis.categories.length >= lengthChart) {
        this.chartOptions.xaxis.categories.splice(0, 1);
      }
      this.chartOptions.xaxis.categories.push(data);
    },
    getChart(numberOfSeries, lengthChart, data) {
      if (this.series[numberOfSeries].data.length >= lengthChart) {
        this.series[numberOfSeries].data.splice(0, 1);
      }
      this.series[numberOfSeries].data.push(data);
      // this.updateSeriesLine(numberOfSeries);
    },
    getRandomArbitrary() {
      return Math.floor(Math.random() * 10);
    },
    updateSeriesLine(numberOfSeries) {
      this.$refs.chart.updateSeries([{
        data: this.series[numberOfSeries].data,
      }], false, true);
    },
  },
  components: {
    // LineChart,
    apexchart: VueApexCharts,
    AlarmText,
  },
});
</script>
<style scoped>
.chart{
  width: 100%;
  min-width:400
  px;
  height: auto;
}
</style>
