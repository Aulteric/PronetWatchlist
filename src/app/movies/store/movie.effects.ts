import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromMovieActions from './movie.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TmdbService } from '../../shared/services/tmdb/tmdb.service';

@Injectable()
export class MovieEffects {

    loadMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromMovieActions.loadMovies),
            mergeMap(() => 
                this.tmdbService.getMovies()
                    .pipe(
                        map(response => fromMovieActions.loadMoviesSuccess({ movies: response.results, page: response.page, totalPages: response.total_pages })),
                        catchError(error => of(fromMovieActions.loadMoviesFailure({ error: error.message })))
                    )
            )
        )
    );

    loadMovieById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromMovieActions.loadMovieById),
            mergeMap((payload) => 
                this.tmdbService.getMovieById(payload.id)
                    .pipe(
                        map(response => fromMovieActions.loadMovieByIdSuccess({ movie: response })),
                        catchError(error => of(fromMovieActions.loadMovieByIdFailure({ error: error.message })))
                    )
            )
        )
    );

    searchMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromMovieActions.searchMovies),
            mergeMap((payload) => 
                this.tmdbService.searchMovies({query: payload.searchTerm})
                    .pipe(
                        map(response => fromMovieActions.searchMoviesSuccess({ movies: response.results, page: response.page, totalPages: response.total_pages })),
                        catchError(error => of(fromMovieActions.loadMovieByIdFailure({ error: error.message })))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tmdbService: TmdbService
    ) { }
}