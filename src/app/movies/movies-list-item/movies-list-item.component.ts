import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from '../../shared/interfaces/IMovie';

@Component({
  selector: 'app-movies-list-item',
  templateUrl: './movies-list-item.component.html',
  styleUrl: './movies-list-item.component.scss'
})
export class MoviesListItemComponent {

  @Input() movie?: IMovie;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect(): void {
    if(this.movie)
    {
      this.router.navigate(['/movies', this.movie.id]);
    }
  }

}
