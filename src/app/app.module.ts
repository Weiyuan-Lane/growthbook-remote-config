import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { API_KEY } from './constants';
import { GrowthbookRemoteConfigModule } from 'growthbook-remote-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GrowthbookRemoteConfigModule.forRoot({
      apiKey: API_KEY,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
