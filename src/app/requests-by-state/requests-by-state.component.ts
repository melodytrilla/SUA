import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests-by-state',
  templateUrl: './requests-by-state.component.html',
  styleUrls: ['./requests-by-state.component.sass']
})
export class RequestsByStateComponent implements OnInit {

  constructor() {
  }

  public doughnutChartLabels = ['Pendientes', 'En curso', 'Resueltas', 'Cerradas'];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartData = [701, 1671, 10773, 477]

  public doughnutChartColors: Array<any> = [
    {
      backgroundColor: ['#9B9487', '#F7B543', '#94D8FA', '#2764F3'],
      hoverBackgroundColor: ['#B2AFAA', '#F6C672', '#BAE3F7', '#6B96FA'],
      borderWidth: 2,
    }
  ];
  public doughnutChartDatasetOverride: Array<any> = [
    {
      label:['pendientes'],
      backgroundColor: ['#9B9487']
    }
  ]

  ngOnInit() {
  }

}
