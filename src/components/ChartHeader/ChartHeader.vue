<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    label: String,
    labels: Array,
    chartData: {
      type: [Array, Object],
      default: null,
    },
    chartColors: Object,
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    // console.log();
    const {
      borderColor,
      pointBorderColor,
      pointBackgroundColor,
      backgroundColor,
    } = this.chartColors;

    this.renderChart(
      {
        labels: this.labels,
        // labels: [45, 12, 245, 350, 300, 10],
        datasets: [
          {
            // label: this.label ?? null,
            data: this.chartData,
            // data: [
            //   { month: "Jan", rate: 270 },
            //   { month: "Feb", rate: 330 },
            //   { month: "Mar", rate: 215 },
            //   { month: "Apr", rate: 350 },
            //   { month: "May", rate: 300 },
            //   { month: "Jun", rate: 200 },
            // ],
            borderColor: borderColor ?? "transparent",
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            backgroundColor: backgroundColor ?? "transparent",
            spanGaps: true,
            pointRadius: 0,
            scales: {
              x: {
                type: "Month",
                min: this.labels[0],
                max: this.labels[this.labels - 1],
              },
              y: {
                type: "Values",
                min: 0,
                max: 350,
              },
            },
          },
        ],
      },
      this.options
    );
  },
};
</script>