import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMovie } from '../../interfaces/IMovie';
import { ISeries } from '../../interfaces/ISeries';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {
  @Input() media?: IMovie | ISeries;
  @Output() onItemClick = new EventEmitter<number>();

  onClick(): void {
    if (this.media) {
      this.onItemClick.emit(this.media.id);
    }
  }

  getTitle(item?: IMovie | ISeries): string {
    if(item){
      return this.isMovie(item) ? item.title : item.name;
    }
    return '';
  }

  getReleaseDate(item?: IMovie | ISeries): string {
    if(item){
      return this.isMovie(item) ? item.release_date : item.first_air_date;
    }
    return '';
  }

  private isMovie(item: IMovie | ISeries): item is IMovie {
    return (item as IMovie).title !== undefined;
  }


}
