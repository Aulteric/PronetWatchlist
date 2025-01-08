import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from '../../shared/interfaces/IMovie';
import { IMoviesState } from '../store/movie.reducers';
import { select, Store } from '@ngrx/store';
import * as fromMovieActions from '../store/movie.actions';
import { selectMovies, selectError } from '../store/movie.selectors';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent {
  movies$: Observable<IMovie[]>;
  loadError$: Observable<string>;
  
  constructor(
    private store: Store<IMoviesState>
  ) { 
    this.movies$ = this.store.pipe(select(selectMovies));
    this.loadError$ = this.store.pipe(select(selectError));
  }
  
  ngOnInit(): void {
    this.updateMovies();
  }
  
  updateMovies(): void {
    this.store.dispatch(fromMovieActions.loadMovies());
  }
  
  onSearch($event: Event): void {
    const inputField = $event.target as HTMLInputElement;
    if(!!inputField.value){
      this.store.dispatch(fromMovieActions.searchMovies({searchTerm: inputField.value}))
    } else {
      this.store.dispatch(fromMovieActions.loadMovies());
    }
    }

}
