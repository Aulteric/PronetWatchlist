import { createSelector } from '@ngrx/store';
import { selectSeriesFavorites } from '../../series/store/series.selectors';
import { selectMovieFavorites } from '../../movies/store/movie.selectors';

export const selectFavorites = createSelector(
  selectMovieFavorites,
  selectSeriesFavorites,
  (movieFavorites, seriesFavorites) => [...movieFavorites, ...seriesFavorites]
);