import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['chartdata', 'options'],
  data() {
    return {
      options: {
        title: {
          display: true,
          text: 'График',
        },
      },
    };
  },
  ready() {
    this.renderChart(this.chartdata, this.options);
  },
};
