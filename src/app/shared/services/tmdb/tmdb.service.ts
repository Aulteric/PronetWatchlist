import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IMovie } from '../../interfaces/IMovie';
import { ISeries } from '../../interfaces/ISeries';
import { IGetSeriesResponse, IGetMoviesResponse, IGetTrendingMediaResponse } from '../../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private API_KEY = 'c76671470e4d8f84d85e9ddf1bebe3db';

  constructor(
    private httpClient: HttpClient
  ) { }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const queryParams = 
    params ? 
    Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&') 
    : '';

    return `${this.baseUrl}${endpoint}?api_key=${this.API_KEY}&${queryParams}`;
  }
  

  getMovies(params?: any): Observable<IGetMoviesResponse> {
    return this.httpClient
      .get<IGetMoviesResponse>(`${this.buildUrl('/discover/movie', params)}`);
  }

  searchMovies(params?: any): Observable<IGetMoviesResponse> {
    return this.httpClient
      .get<IGetMoviesResponse>(`${this.buildUrl('/search/movie', params)}`);
  }

  getMovieById(id: number | string): Observable<IMovie> {
    return this.httpClient.get<IMovie>(`${this.buildUrl(`/movie/${id}`)}`);
  }

  getSeries(params?: any): Observable<IGetSeriesResponse> {
    return this.httpClient
      .get<IGetSeriesResponse>(`${this.buildUrl('/discover/tv', params)}`);
  }


  searchSeries(params?: any): Observable<IGetSeriesResponse> {
    return this.httpClient
      .get<IGetSeriesResponse>(`${this.buildUrl('/search/series', params)}`);
  }

  getSeriesById(id: number): Observable<ISeries> {
    return this.httpClient.get<ISeries>(`${this.buildUrl(`/tv/${id}`)}`);
  }

  getTrendingMedia(): Observable<IGetTrendingMediaResponse> {
    return this.httpClient.get<IGetTrendingMediaResponse>(`${this.buildUrl(`/trending/all/day`)}`);
  }
}
