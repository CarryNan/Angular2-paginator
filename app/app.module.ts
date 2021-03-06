import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Paginator } from './paginator/paginator.component';

import { PaginatorServie } from './paginator.service';

@NgModule({
  imports:        [ BrowserModule, FormsModule ],
  declarations:   [ AppComponent, Paginator ],
  bootstrap:      [ AppComponent ],
  providers: [ PaginatorServie ]
})
export class AppModule { }
