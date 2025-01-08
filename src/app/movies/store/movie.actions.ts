import { createAction, props } from '@ngrx/store';
import { IMovie } from '../../shared/interfaces/IMovie';

export const loadMovies = createAction(
    '[Movies List Component] Load Movies',
);

export const loadMoviesSuccess = createAction(
    '[Movies List Component] Load Movies Success',
    props<{movies: IMovie[], totalPages: number, page: number,}>()
);

export const loadMoviesFailure = createAction(
    '[Movies List Component] Load Movies Failure',
    props<{error: any}>()
);

export const loadMovieById = createAction(
    '[Movie Details Component] Load Movie By Id',
    props<{id: number}>()
);

export const loadMovieByIdSuccess = createAction(
    '[Movie Details Component] Load Movie By Id Success',
    props<{movie: IMovie}>()
);

export const loadMovieByIdFailure = createAction(
    '[Movie Details Component] Load Movie By Id Failure',
    props<{error: any}>()
);

export const searchMovies = createAction(
  '[Movies List Component] Search Movies',
  props<{ searchTerm: string }>()
);

export const searchMoviesSuccess = createAction(
    '[Movie Details Component] Search Movies Success',
    props<{movies: IMovie[], totalPages: number, page: number,}>()
);

export const searchMoviesFailure = createAction(
    '[Movie Details Component] Search Movies Failure',
    props<{error: any}>()
);

export const setPagination = createAction(
  '[Movies List Component] Set Pagination',
  props<{ page: number; pageSize: number }>()
);

export const setPaginationSuccess = createAction(
  '[Movies List Component] Set Pagination Success',
  props<{ page: number; pageSize: number }>()
);

export const setPaginationFailure = createAction(
  '[Movies List Component] Set Pagination Failure',
  props<{error: any}>()
);

export const addMovieToFavorite = createAction(
  '[Movies] Add Movie To Favorite',
  props<{ movie: IMovie }>()
);

export const removeMovieFromFavorite = createAction(
  '[Movies] Remove Movie From Favorite',
  props<{ movieId: number }>()
);
