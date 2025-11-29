import { Component, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.html',
  styleUrls: ['./chart.css']
})
export class ChartComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const chartDom = document.getElementById('myChart')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'نمودار تعداد کاربران (بر حسب نیمه سال)'
      },
      tooltip: {},
      xAxis: {
        data: ['نیمه اول', 'نیمه دوم', 'نیمه سوم', 'نیمه چهارم', 'جمعا']
      },
      yAxis: {},
      series: [
        {
          name: 'مقدار',
          type: 'bar',
          data: [5, 20, 16, 10, 38]
        }
      ]
    };

    myChart.setOption(option);
  }

}
