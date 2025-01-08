import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  transform(genres: { id: number; name: string }[]): string {
    return genres.map(g => g.name).join(', ');
  }
}
