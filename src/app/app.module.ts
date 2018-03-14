import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { TransferListComponent } from './transfers/transfer-list/transfer-list.component';
import { TransferDetailsComponent } from './transfers/transfer-details/transfer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientDetailsComponent,
    ClientListComponent,
    TransferListComponent,
    TransferDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
