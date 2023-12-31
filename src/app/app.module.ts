import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScrabbleComponent} from './components/scrabble/scrabble.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TopScoresComponent} from './components/dialogs/top-scores/top-scores.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipModule} from 'primeng/tooltip';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {httpInterceptorProviders} from './http-interceptors';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    ScrabbleComponent,
    TopScoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    TooltipModule,
    DynamicDialogModule,
    DialogModule,
    PaginatorModule
  ],
  providers: [MessageService, DialogService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
