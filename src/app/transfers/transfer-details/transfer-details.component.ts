import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';

import { Transfer } from './../transfer';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css'],
})
export class TransferDetailsComponent implements OnInit {
  title: string = 'File: ';
  chartColors: String[] = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f'];
  @ViewChild(ChartComponent) transferChart: ChartComponent;

  @Input()
  set transfer(transfer: Transfer) {
    if (transfer === undefined) return;
    this.title = 'File: ' + transfer.fileName;
    this.data.datasets[0].label = transfer.usage[0].client;
    this.data.datasets[0].data = transfer.usage[0].usage;
    this.data.datasets[1].label = transfer.usage[1].client;
    this.data.datasets[1].data = transfer.usage[1].usage;

    this.transferChart.chart.update();
  }

  type = 'line';
  data = {
    labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: this.chartColors[0],
        borderColor: this.chartColors[0],
        fill: false,
      },
      {
        label: '',
        data: [],
        backgroundColor: this.chartColors[1],
        borderColor: this.chartColors[1],
        fill: false,
      },
    ],
  };
  options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: '% Transferred',
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'CPU Usage',
          },
        },
      ],
    },
  };

  constructor() {}

  ngOnInit() {}
}
