import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IMovie } from '../../shared/interfaces/IMovie';
import { TmdbService } from '../../shared/services/tmdb/tmdb.service';
import { select, Store } from '@ngrx/store';
import { IMoviesState } from '../store/movie.reducers';
import { selectSelectedMovie } from '../store/movie.selectors';
import { loadMovieById } from '../store/movie.actions';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrl: './movies-details.component.scss'
})
export class MoviesDetailsComponent {
  movie$: Observable<IMovie>;
  routerParameterId: number;
  genres: { id: number; name: string }[] = []; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<IMoviesState>
  ) {
    this.routerParameterId = activatedRoute.snapshot.params['id'];
    this.store.dispatch(loadMovieById({ id: this.routerParameterId }));
    
    this.movie$ = this.store.pipe(select(selectSelectedMovie));
    this.movie$.subscribe(movie => {
      if (movie && movie.genres && Array.isArray(movie.genres)) {
        this.genres = movie.genres
      } 
    });
   }

  ngOnInit(): void {
  }
}
