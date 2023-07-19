import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScrabbleComponent} from './components/scrabble/scrabble.component';

const routes: Routes = [{path: '', component: ScrabbleComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
