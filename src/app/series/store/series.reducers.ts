import { createReducer, on } from '@ngrx/store';
import * as seriesActions from './series.actions';
import { ISeries } from '../../shared/interfaces/ISeries';

export const seriesStateFeatureKey = 'seriesState';

export interface ISeriesState {
    series: ISeries[];
    searchTerm: string;
    page: number;
    pageSize: number;
    total_pages: number;
    error: any;
    isLoading: boolean;
    selectedSeries: ISeries;
    favorites: ISeries[];
}

export const initialState: ISeriesState = {
    series: [],
    error: null,
    searchTerm: '',
    page: 1,
    pageSize: 30,
    total_pages: 1,
    isLoading: false,
    selectedSeries: {
        poster_path: null,
        overview: '',
        id: 0,
        original_name: '',
        name: '',
        backdrop_path: null,
        popularity: 0,
        vote_count: 0,
        original_language: '',
        vote_average: 0,
        first_air_date: '',
        origin_country: [],
        genre_ids: []
    },
    favorites: [],
};

export const redusers = createReducer(
    initialState,

    on(seriesActions.loadSeries, (state, action) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(seriesActions.loadSeriesSuccess, (state, action) => {
        return {
            ...state,
            isLoading: false,
            series: action.series
        };
    }),

    on(seriesActions.loadSeriesFailure, (state, action) => {
        return {
            ...state,
            isLoading: false,
            error: action.error
        };
    }),

    on(seriesActions.loadSeriesById, (state, action) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(seriesActions.loadSeriesByIdSuccess, (state, action) => {
        return {
            ...state,
            isLoading: false,
            selectedSeries: action.series
        };
    }),

    on(seriesActions.loadSeriesByIdFailure, (state, action) => {
        return {
            ...state,
            isLoading: false,
            error: action.error
        };
    }),

    on(seriesActions.searchSeries, (state, action) => ({
        ...state,
        searchTerm: action.searchTerm,
        page: 1,  
    })),

    on(seriesActions.searchSeriesSuccess, (state, action) => ({
        ...state,
        series: action.series,
        page: 1,  
    })),

    on(seriesActions.setPagination, (state, action) => ({
        ...state,
        page: action.page,
        pageSize: action.pageSize,
    })),

    on(seriesActions.addSeriesToFavorite, (state, action) => ({
        ...state,
        favorites: [...state.favorites, action.series],
    })),

    on(seriesActions.removeSeriesFromFavorite, (state, action) => ({
        ...state,
        favorites: state.favorites.filter(series => series.id !== action.seriesId),
    }))
    
)