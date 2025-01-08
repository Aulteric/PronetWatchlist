import { createReducer, on } from '@ngrx/store';
import * as movieActions from './movie.actions';
import { IMovie } from '../../shared/interfaces/IMovie';

export const movieStateFeatureKey = 'moviesState';

export interface IMoviesState {
    movies: IMovie[];
    searchTerm: string;
    page: number;
    pageSize: number;
    total_pages: number;
    error: any;
    isLoading: boolean;
    selectedMovie: IMovie;
    favorites: IMovie[];
}

export const initialState: IMoviesState = {
    movies: [],
    error: null,
    searchTerm: '',
    page: 1,
    pageSize: 30,
    total_pages: 1,
    isLoading: false,
    selectedMovie: {
        poster_path: null,
        adult: false,
        overview: '',
        release_date: '',
        genres: [{ "id": 0, "name": "" }],
        id: 0,
        original_title: '',
        title: '',
        backdrop_path: null,
        popularity: 0,
        vote_count: 0,
        video: false,
        vote_average: 0,
        runtime: 0
    },
    favorites: [],
};

export const redusers = createReducer(
    initialState,

    on(movieActions.loadMovies, (state, action) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(movieActions.loadMoviesSuccess, (state, action) => {
        return {
            ...state,
            isLoading: false,
            movies: action.movies
        };
    }),

    on(movieActions.loadMoviesFailure, (state, action) => {
        return {
            ...state,
            isLoading: false,
            error: action.error
        };
    }),

    on(movieActions.loadMovieById, (state, action) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(movieActions.loadMovieByIdSuccess, (state, action) => {
        return {
            ...state,
            isLoading: false,
            selectedMovie: action.movie
        };
    }),

    on(movieActions.loadMovieByIdFailure, (state, action) => {
        return {
            ...state,
            isLoading: false,
            error: action.error
        };
    }),

    on(movieActions.searchMovies, (state, action) => ({
        ...state,
        searchTerm: action.searchTerm,
        page: 1,  
    })),

    on(movieActions.searchMoviesSuccess, (state, action) => ({
        ...state,
        movies: action.movies,
        page: 1,  
    })),

    on(movieActions.setPagination, (state, action) => ({
        ...state,
        page: action.page,
        pageSize: action.pageSize,
    })),

    on(movieActions.addMovieToFavorite, (state, action) => ({
        ...state,
        favorites: [...state.favorites, action.movie],
    })),

    on(movieActions.removeMovieFromFavorite, (state, action) => ({
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.movieId),
    }))
    
)