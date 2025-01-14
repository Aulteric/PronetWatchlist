import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TmdbService } from './tmdb.service';
import { IMovie } from '../../interfaces/IMovie';
import { ISeries } from '../../interfaces/ISeries';
import { IGetSeriesResponse, IGetMoviesResponse, IGetTrendingMediaResponse } from '../../interfaces/responses';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock: HttpTestingController;

  const API_KEY = 'c76671470e4d8f84d85e9ddf1bebe3db';
  const BASE_URL = 'https://api.themoviedb.org/3';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TmdbService],
    });
    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies with correct URL and params', () => {
    const mockResponse: IGetMoviesResponse = { results: [], page: 1, total_pages: 1, total_results: 0 };
    const params = { language: 'en-US', page: 1 };

    service.getMovies(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should search movies with correct URL and params', () => {
    const mockResponse: IGetMoviesResponse = { results: [], page: 1, total_pages: 1, total_results: 0 };
    const params = { query: 'Inception', language: 'en-US' };

    service.searchMovies(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=Inception&language=en-US`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movie by ID with correct URL', () => {
    const mockMovie: IMovie = {
      id: 1,
      title: 'Mock Movie',
      release_date: '2022-01-01',
      runtime: 120,
      vote_average: 8.5,
      overview: 'This is a mock movie.',
      backdrop_path: 'mock_backdrop.jpg',
      poster_path: 'mock_poster.jpg',
      genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }],
      adult: false,
      original_title: 'Mock Movie',
      popularity: 15,
      vote_count: 10,
      video: false,
    };

    service.getMovieById(1).subscribe((movie) => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(`${BASE_URL}/movie/1?api_key=${API_KEY}&`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });

  it('should fetch series with correct URL and params', () => {
    const mockResponse: IGetSeriesResponse = { results: [], page: 1, total_pages: 1, total_results: 0 };
    const params = { language: 'en-US', page: 1 };

    service.getSeries(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should search series with correct URL and params', () => {
    const mockResponse: IGetSeriesResponse = { results: [], page: 1, total_pages: 1, total_results: 0 };
    const params = { query: 'Breaking Bad', language: 'en-US' };

    service.searchSeries(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${BASE_URL}/search/series?api_key=${API_KEY}&query=Breaking Bad&language=en-US`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch series by ID with correct URL', () => {
    const mockSeries: ISeries = {
      id: 1,
      name: 'Mock Series',
      first_air_date: '2020-01-01',
      vote_average: 8.5,
      overview: 'This is a mock series overview.',
      backdrop_path: 'mock_backdrop.jpg',
      poster_path: 'mock_poster.jpg',
      popularity: 0,
      origin_country: [],
      genre_ids: [],
      original_language: '',
      vote_count: 0,
      original_name: ''
    };

    service.getSeriesById(1).subscribe((series) => {
      expect(series).toEqual(mockSeries);
    });
    
    const req = httpMock.expectOne(`${BASE_URL}/tv/1?api_key=${API_KEY}&`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSeries);
  });

  it('should fetch trending media with correct URL', () => {
    const mockResponse: IGetTrendingMediaResponse = { results: [], page: 1, total_pages: 1, total_results: 0 };

    service.getTrendingMedia().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
