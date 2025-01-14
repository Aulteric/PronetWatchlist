import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { SeriesDetailsComponent } from './series-details.component';
import { ISeries } from '../../shared/interfaces/ISeries';
import { loadSeriesById, addSeriesToFavorite, removeSeriesFromFavorite } from '../store/series.actions';
import { selectSelectedSeries, selectSeriesFavorites } from '../store/series.selectors';

describe('SeriesDetailsComponent', () => {
  let component: SeriesDetailsComponent;
  let fixture: ComponentFixture<SeriesDetailsComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

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

  const mockFavorites: ISeries[] = [mockSeries];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeriesDetailsComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSelectedSeries, value: mockSeries },
            { selector: selectSeriesFavorites, value: mockFavorites },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1 } } },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(SeriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadSeriesById on initialization', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadSeriesById({ id: 1 }));
  });

  it('should display series details', () => {
    const titleElement = fixture.debugElement.nativeElement.querySelector('.series-title');
    const ratingElement = fixture.debugElement.nativeElement.querySelector('.rating');
    const overviewElement = fixture.debugElement.nativeElement.querySelector('.overview');

    expect(titleElement.textContent).toContain(mockSeries.name);
    expect(ratingElement.textContent).toContain(mockSeries.vote_average.toString());
    expect(overviewElement.textContent).toContain(mockSeries.overview);
  });

  it('should correctly determine if the series is a favorite', () => {
    expect(component.isFavorite).toBeTrue();
  });

  it('should dispatch addSeriesToFavorite when adding to favorites', () => {
    component.isFavorite = false;
    component.toggleFavorite(mockSeries);
    expect(dispatchSpy).toHaveBeenCalledWith(addSeriesToFavorite({ series: mockSeries }));
  });

  it('should dispatch removeSeriesFromFavorite when removing from favorites', () => {
    component.isFavorite = true;
    component.toggleFavorite(mockSeries);
    expect(dispatchSpy).toHaveBeenCalledWith(removeSeriesFromFavorite({ seriesId: mockSeries.id }));
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const unsubscribeSpy = spyOn(component['subs'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
