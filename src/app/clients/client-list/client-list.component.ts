import { Component, OnInit } from '@angular/core';

import { ClientService } from '../client.service';
import { Client } from '../client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [ClientService],
})
export class ClientListComponent implements OnInit {
  clients: Client[];

  constructor(private service: ClientService) {}

  ngOnInit() {
    this.service.getClients().then((clients: Client[]) => {
      this.clients = clients;
      return clients;
    });
  }
}
