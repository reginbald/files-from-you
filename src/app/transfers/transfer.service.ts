import { Injectable } from '@angular/core';
import { Transfer } from './transfer';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TransferService {
  private url = 'https://hive-files-from-you.herokuapp.com/api/transfers';

  constructor(private http: Http) {}

  // get("/api/transfers")
  getTransfers(): Promise<void | Transfer[]> {
    return this.http
      .get(this.url)
      .toPromise()
      .then(response => response.json() as Transfer[])
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
