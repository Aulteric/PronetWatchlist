import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from './directives/image-fallback/image-fallback.directive';
import { HttpClientModule } from '@angular/common/http';
import { GenrePipe } from './pipes/genre.pipe';


@NgModule({
  declarations: [
    ImageFallbackDirective,
    GenrePipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ImageFallbackDirective,
    GenrePipe,
  ]
})
export class SharedModule { }
