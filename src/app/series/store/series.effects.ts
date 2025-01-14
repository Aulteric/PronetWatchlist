import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromSeriesActions from './series.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TmdbService } from '../../shared/services/tmdb/tmdb.service';

@Injectable()
export class SeriesEffects {

    loadSeries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesActions.loadSeries),
            mergeMap(() => 
                this.tmdbService.getSeries()
                    .pipe(
                        map(response => fromSeriesActions.loadSeriesSuccess({ series: response.results, page: response.page, totalPages: response.total_pages })),
                        catchError(error => of(fromSeriesActions.loadSeriesFailure({ error: error.mesage })))
                    )
            )
        )
    );

    loadSeriesById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesActions.loadSeriesById),
            mergeMap((payload) => 
                this.tmdbService.getSeriesById(payload.id)
                    .pipe(
                        map(response => fromSeriesActions.loadSeriesByIdSuccess({ series: response })),
                        catchError(error => of(fromSeriesActions.loadSeriesByIdFailure({ error: error.mesage })))
                    )
            )
        )
    );

    searchSeries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesActions.searchSeries),
            mergeMap((payload) => 
                this.tmdbService.searchSeries({query: payload.searchTerm})
                    .pipe(
                        map(response => fromSeriesActions.searchSeriesSuccess({ series: response.results, page: response.page, totalPages: response.total_pages })),
                        catchError(error => of(fromSeriesActions.loadSeriesByIdFailure({ error: error.mesage })))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tmdbService: TmdbService
    ) { }
}