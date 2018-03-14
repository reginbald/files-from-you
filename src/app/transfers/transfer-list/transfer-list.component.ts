import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
})
export class TransferListComponent implements OnInit {
  transfers = [
    {
      name: 'transfer 1',
      date: new Date('1/1/16'),
    },
    {
      name: 'transfer 2',
      date: new Date('1/17/16'),
    },
    {
      name: 'transfer 3',
      date: new Date('1/28/16'),
    },
  ];

  constructor() {}

  ngOnInit() {}
}
