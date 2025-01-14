import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISeriesState, seriesStateFeatureKey } from './series.reducers';

export const selectSeriesFeature = createFeatureSelector<ISeriesState>(
    seriesStateFeatureKey
);

export const selectSeries = createSelector(
    selectSeriesFeature,
    (state: ISeriesState) => state.series
);

export const selectError = createSelector(
    selectSeriesFeature,
    (state: ISeriesState) => state.error
);

export const selectSelectedSeries = createSelector(
    selectSeriesFeature,
    (state: ISeriesState) => state.selectedSeries
);

export const selectSeriesFavorites = createSelector(
    selectSeriesFeature,
    (state: ISeriesState) => state.favorites
  );
  
export const isFavorite = (seriesId: number) =>
createSelector(
    selectSeriesFeature,
    (state: ISeriesState) => state.favorites.some(series => series.id === seriesId)
);