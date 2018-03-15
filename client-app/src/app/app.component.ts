import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';

import { RestService } from './rest.service';
import { Client } from './client';
import { Transfer, CpuUsage } from './transfer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestService],
})
export class AppComponent implements OnInit {
  title = 'FilesFromYou';
  clientCreated: boolean = false;
  loading: boolean = false;
  client: Client = new Client();
  clients: Client[] = [];
  transfer: Transfer = new Transfer();
  selectedClient: Client;
  max = 1;
  current = 0;

  /// Getters to prevent NaN errors
  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }
  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }
  get isFinished() {
    return this.currentVal >= this.maxVal;
  }

  constructor(private service: RestService) {}

  ngOnInit() {
    this.service.getClients().then((clients: Client[]) => {
      this.clients = clients;
      return clients;
    });
  }

  // Simulate file transfer on button press
  start() {
    this.transfer.clientIds.push(this.client._id);
    this.transfer.clientIds.push(this.selectedClient._id);

    let usage1 = new CpuUsage();
    usage1.client = this.client.name;
    usage1.usage = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    this.transfer.usage.push(usage1);

    let usage2 = new CpuUsage();
    usage2.client = this.selectedClient.name;
    usage2.usage = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    this.transfer.usage.push(usage2);

    this.service.createTransfer(this.transfer);

    const interval = Observable.interval(1000);

    interval
      .takeWhile(_ => !this.isFinished)
      .do(i => (this.current += 0.1))
      .subscribe();
  }

  // Create client on button press
  onCreate() {
    this.loading = true;
    this.service.createClient(this.client).then((client: Client) => {
      this.client = client;
      this.loading = false;
      this.clientCreated = true;
      return client;
    });
  }
}
