import { Injectable } from '@angular/core';
import { Client } from './client';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClientService {
  private url = 'https://hive-files-from-you.herokuapp.com/api/clients';

  constructor(private http: Http) {}

  // get("/api/clients")
  getClients(): Promise<void | Client[]> {
    return this.http
      .get(this.url)
      .toPromise()
      .then(response => response.json() as Client[])
      .catch(this.errorHandler);
  }

  // post("/api/clients")
  createClient(newClient: Client): Promise<void | Client> {
    return this.http
      .post(this.url, newClient)
      .toPromise()
      .then(response => response.json() as Client)
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
