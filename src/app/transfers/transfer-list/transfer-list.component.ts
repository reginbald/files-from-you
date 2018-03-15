import { Component, OnInit, Input } from '@angular/core';
import { TransferService } from './../transfer.service';
import { Transfer } from './../transfer';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
})
export class TransferListComponent implements OnInit {
  @Input() transfers: Transfer[];

  constructor() {}

  ngOnInit() {}
}
