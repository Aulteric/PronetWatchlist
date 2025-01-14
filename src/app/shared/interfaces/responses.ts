import { IMovie } from './IMovie';
import { ISeries } from './ISeries';
import { ITrendingMedia } from './ITrendingMedia';

export interface IGetMoviesResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: IMovie[];
}

export interface IGetSeriesResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: ISeries[];
}

export interface IGetTrendingMediaResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: ITrendingMedia[];
}