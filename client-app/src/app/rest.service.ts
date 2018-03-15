import { Injectable } from '@angular/core';
import { Client } from './client';
import { Transfer } from './transfer';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestService {
  private baseurl = 'https://hive-files-from-you.herokuapp.com/api/';

  constructor(private http: Http) {}

  // get("/api/clients")
  getClients(): Promise<void | Client[]> {
    return this.http
      .get(this.baseurl + 'clients')
      .toPromise()
      .then(response => response.json() as Client[])
      .catch(this.errorHandler);
  }

  // post("/api/clients")
  createClient(newClient: Client): Promise<void | Client> {
    return this.http
      .post(this.baseurl + 'clients', newClient)
      .toPromise()
      .then(response => response.json() as Client)
      .catch(this.errorHandler);
  }

  // post("/api/transfers")
  createTransfer(newTransfer: Transfer): Promise<void | Transfer> {
    return this.http
      .post(this.baseurl + 'transfers', newTransfer)
      .toPromise()
      .then(response => response.json() as Transfer)
      .catch(this.errorHandler);
  }

  // Error Handler
  private errorHandler(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
