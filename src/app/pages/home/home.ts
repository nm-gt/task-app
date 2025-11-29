import { Component } from '@angular/core';
import { Cards } from '../../components/cards/cards';
import { NgFor } from '@angular/common';
import { ChartComponent } from "../../components/chart/chart";
import { ChartComponent2 } from '../../components/chart2/chart2';

@Component({
  selector: 'app-home',
  imports: [Cards, NgFor, ChartComponent, ChartComponent2],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  cards = [
    { title: 'وظایت با اولویت بالا', subtitle: 'یادداشت', text: 'متن وظایف با اولویت بالا اینجاست' },
    { title: 'وظایف انجام شده', subtitle: 'یادداشت دوم', text: 'متن وظایف با اولویت بالا اینجاست' },
    { title: 'همه وظایف', subtitle: 'یادداشت سوم', text: 'متن وظایف با اولویت بالا اینجاست' },
  ];

}
