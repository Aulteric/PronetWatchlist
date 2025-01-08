import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]'
})
export class ImageFallbackDirective {

  @Input() appImageFallback?: string;

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('error')loadFallbackImageOnError(){
    const element: HTMLImageElement = <HTMLImageElement>this.elementRef.nativeElement;
    element.src = this.appImageFallback || 'assets/no-poster.jpg';
  }
}
