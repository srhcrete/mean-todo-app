import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AppComponent } from './app.component';
import { GistComponent } from './gist/gist.component';


@NgModule({
  declarations: [
    AppComponent,
    GistComponent
  ],
  imports: [
    BrowserModule,
    NgModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ToasterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  private toasterService: ToasterService;

      constructor(toasterService: ToasterService) {
          this.toasterService = toasterService;
      }

      popToast() {
          this.toasterService.pop('success', 'Args Title', 'Args Body');
      }

}
