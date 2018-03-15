import { TransferService } from './transfers/transfer.service';
import { Component } from '@angular/core';
import { Transfer } from './transfers/transfer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TransferService],
})
export class AppComponent {
  title = 'FilesFromYou Analytics';
  transfers: Transfer[];
  loading: boolean = true;

  constructor(private service: TransferService) {}

  ngOnInit() {
    this.service.getTransfers().then((transfers: Transfer[]) => {
      this.transfers = transfers;
      this.loading = false;
      return transfers;
    });
  }
}
