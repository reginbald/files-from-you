import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientListComponent } from './clients/client-list/client-list.component';

@NgModule({
  declarations: [AppComponent, ClientDetailsComponent, ClientListComponent],
  imports: [BrowserModule, HttpModule, BrowserAnimationsModule, MatExpansionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
