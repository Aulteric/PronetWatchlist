import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesState, movieStateFeatureKey } from './movie.reducers';

export const selectMoviesFeature = createFeatureSelector<IMoviesState>(
    movieStateFeatureKey
);

export const selectMovies = createSelector(
    selectMoviesFeature,
    (state: IMoviesState) => state.movies
);

export const selectError = createSelector(
    selectMoviesFeature,
    (state: IMoviesState) => state.error
);

export const selectSelectedMovie = createSelector(
    selectMoviesFeature,
    (state: IMoviesState) => state.selectedMovie
);

export const selectMovieFavorites = createSelector(
    selectMoviesFeature,
    (state: IMoviesState) => state.favorites
);