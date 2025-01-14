import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { IMovie } from '../../shared/interfaces/IMovie';
import { TmdbService } from '../../shared/services/tmdb/tmdb.service';
import { select, Store } from '@ngrx/store';
import { IMoviesState } from '../store/movie.reducers';
import { selectMovieFavorites, selectSelectedMovie } from '../store/movie.selectors';
import { addMovieToFavorite, loadMovieById, removeMovieFromFavorite } from '../store/movie.actions';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrl: './movies-details.component.scss'
})
export class MoviesDetailsComponent implements OnInit, OnDestroy {
  movie$: Observable<IMovie>;
  movie: IMovie | null = null;
  routerParameterId: number;
  genres: { id: number; name: string }[] = []; 
  isFavorite: boolean = true;
  private subs = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<IMoviesState>
  ) {
    this.routerParameterId = activatedRoute.snapshot.params['id'];
    this.store.dispatch(loadMovieById({ id: this.routerParameterId }));
    
    this.movie$ = this.store.pipe(select(selectSelectedMovie));
    this.subs.add(this.movie$.subscribe(movie => {
      this.movie = movie;
      if (movie?.genres) {
        this.genres = movie.genres
      } 
      this.subs.add(
        this.store.pipe(
          select(selectMovieFavorites),
          map(favorites => favorites.some(fav => fav.id === movie.id))
        ).subscribe(isFavorite => {
          this.isFavorite = isFavorite;
        })
      );
    }));


   }
   
   ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }

  toggleFavorite(movie: IMovie): void {
      if (this.isFavorite) {
        this.store.dispatch(removeMovieFromFavorite({ movieId: movie.id }));
      } else {
        this.store.dispatch(addMovieToFavorite({ movie }));
      }
  }
}
