import { createAction, props } from '@ngrx/store';
import { ISeries } from '../../shared/interfaces/ISeries';

export const loadSeries = createAction(
    '[Series List Component] Load Series',
);

export const loadSeriesSuccess = createAction(
    '[Series List Component] Load Series Success',
    props<{series: ISeries[], totalPages: number, page: number,}>()
);

export const loadSeriesFailure = createAction(
    '[Series List Component] Load Series Failure',
    props<{error: any}>()
);

export const loadSeriesById = createAction(
    '[Series Details Component] Load Series By Id',
    props<{id: number}>()
);

export const loadSeriesByIdSuccess = createAction(
    '[Series Details Component] Load Series By Id Success',
    props<{series: ISeries}>()
);

export const loadSeriesByIdFailure = createAction(
    '[Series Details Component] Load Series By Id Failure',
    props<{error: any}>()
);

export const searchSeries = createAction(
  '[Series List Component] Search Series',
  props<{ searchTerm: string }>()
);

export const searchSeriesSuccess = createAction(
    '[Series Details Component] Search Series Success',
    props<{series: ISeries[], totalPages: number, page: number,}>()
);

export const searchSeriesFailure = createAction(
    '[Series Details Component] Search Series Failure',
    props<{error: any}>()
);

export const setPagination = createAction(
  '[Series List Component] Set Pagination',
  props<{ page: number; pageSize: number }>()
);

export const setPaginationSuccess = createAction(
  '[Series List Component] Set Pagination Success',
  props<{ page: number; pageSize: number }>()
);

export const setPaginationFailure = createAction(
  '[Series List Component] Set Pagination Failure',
  props<{error: any}>()
);

export const addSeriesToFavorite = createAction(
  '[Series] Add Series To Favorite',
  props<{ series: ISeries }>()
);

export const removeSeriesFromFavorite = createAction(
  '[Series] Remove Series From Favorite',
  props<{ seriesId: number }>()
);
