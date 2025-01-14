import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesDetailsComponent } from './series-details/series-details.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import * as fromSeriesState from './store/series.reducers'
import { SeriesEffects } from './store/series.effects';


@NgModule({
  declarations: [
    SeriesListComponent,
    SeriesDetailsComponent,
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromSeriesState.seriesStateFeatureKey, fromSeriesState.redusers),
    EffectsModule.forFeature([SeriesEffects]),
  ]
})
export class SeriesModule { }
