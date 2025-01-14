import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovieEffects } from './store/movie.effects';
import * as fromMovieState from './store/movie.reducers'
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesDetailsComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromMovieState.movieStateFeatureKey, fromMovieState.redusers),
    EffectsModule.forFeature([MovieEffects]),
  ]
})
export class MoviesModule { }
