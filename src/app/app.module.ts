import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScrabbleComponent} from './components/scrabble/scrabble.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TopScoresComponent} from './components/top-scores/top-scores.component';
import {HttpClientModule} from '@angular/common/http';
import {TooltipComponent} from './components/tooltip/tooltip.component';
import {TooltipDirective} from './components/tooltip/tooltip.directive';
import {ToastComponent} from './components/toast/toast.component';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ScrabbleComponent,
    TopScoresComponent,
    TooltipComponent,
    TooltipDirective,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
