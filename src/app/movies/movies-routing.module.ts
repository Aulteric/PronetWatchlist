import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: ':id', component: MoviesDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
