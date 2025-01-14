import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovieEffects } from '../movies/store/movie.effects';
import { SeriesEffects } from '../series/store/series.effects';
import * as fromMovieState from './../movies/store/movie.reducers'
import * as fromSeriesState from './../series/store/series.reducers'


@NgModule({
  declarations: [
    FavoritesListComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromMovieState.movieStateFeatureKey, fromMovieState.redusers),
    EffectsModule.forFeature([MovieEffects]),
    StoreModule.forFeature(fromSeriesState.seriesStateFeatureKey, fromSeriesState.redusers),
    EffectsModule.forFeature([SeriesEffects]),
  ]
})
export class FavoritesModule { }
