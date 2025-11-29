import { Component, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.html',
  styleUrls: ['./chart2.css']
})
export class ChartComponent2 implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const chartDom = document.getElementById('myChart2')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'نمودار دیدگاه کاربران'
      },
      tooltip: {},
      xAxis: {
        data: ['نیمه اول', 'نیمه دوم', 'نیمه سوم', 'نیمه چهارم']
      },
      yAxis: {},
      series: [
        {
          name: 'مقدار',
          type: 'bar',
          data: [5, 20, 36, 10, 10]
        }
      ]
    };

    myChart.setOption(option);
  }
}
