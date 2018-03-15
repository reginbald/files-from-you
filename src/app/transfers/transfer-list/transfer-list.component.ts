import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransferService } from './../transfer.service';
import { Transfer } from './../transfer';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
})
export class TransferListComponent implements OnInit {
  @Input() transfers: Transfer[] = [];
  @Output() onSelect = new EventEmitter<Transfer>();
  selected: Transfer;
  hightlights: Array<boolean> = [true];
  pastIndex: number = 0;

  constructor() {}

  ngOnInit() {}

  select(transfer: Transfer, index: number) {
    this.onSelect.emit(transfer);
    this.hightlights[this.pastIndex] = false;
    this.hightlights[index] = true;
    this.pastIndex = index;
    this.selected = transfer;
  }
}
