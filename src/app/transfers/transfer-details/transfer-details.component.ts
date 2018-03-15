import { Transfer } from './../transfer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css'],
})
export class TransferDetailsComponent implements OnInit {
  chartColors: String[] = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f'];

  @Input()
  set transfer(transfer: Transfer) {
    console.log('Transfer', transfer);
  }

  type = 'line';
  data = {
    labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
    datasets: [
      {
        label: 'Client 1',
        data: [0, 10, 100, 100, 100, 80, 100, 100, 70, 0],
        backgroundColor: this.chartColors[0],
        borderColor: this.chartColors[0],
        fill: false,
      },
      {
        label: 'Client 2',
        data: [0, 10, 80, 40, 30, 80, 100, 100, 40, 0],
        backgroundColor: this.chartColors[1],
        borderColor: this.chartColors[1],
        fill: false,
      },
    ],
  };
  options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Filename: large-file.exe',
    },
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
