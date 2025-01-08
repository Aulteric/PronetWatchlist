import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesDetailsComponent } from './series-details/series-details.component';
import { SeriesListItemComponent } from './series-list-item/series-list-item.component';


@NgModule({
  declarations: [
    SeriesListComponent,
    SeriesDetailsComponent,
    SeriesListItemComponent
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule
  ]
})
export class SeriesModule { }
