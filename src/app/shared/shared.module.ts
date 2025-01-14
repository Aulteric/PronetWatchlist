import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from './directives/image-fallback/image-fallback.directive';
import { HttpClientModule } from '@angular/common/http';
import { MediaCardComponent } from './components/media-card/media-card.component';
import { SearchTextFilterPipe } from './pipes/search-text-filter/search-text-filter.pipe';
import { GenrePipe } from './pipes/genre/genre.pipe';


@NgModule({
  declarations: [
    ImageFallbackDirective,
    GenrePipe,
    MediaCardComponent,
    SearchTextFilterPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ImageFallbackDirective,
    GenrePipe,
    MediaCardComponent,
    SearchTextFilterPipe,
  ]
})
export class SharedModule { }
