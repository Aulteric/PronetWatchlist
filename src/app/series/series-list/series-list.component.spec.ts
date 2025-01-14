import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { SeriesListComponent } from './series-list.component';
import { ISeries } from '../../shared/interfaces/ISeries';
import * as fromSeriesActions from '../store/series.actions';
import { selectSeries, selectError } from '../store/series.selectors';
import { SharedModule } from '../../shared/shared.module';

const mockSeries: ISeries[] = [
  { 
    id: 1,
    name: 'Mock Series 1',
    first_air_date: '2020-01-01',
    vote_average: 8.5,
    overview: 'This is a mock series overview.',
    backdrop_path: 'mock_backdrop.jpg',
    poster_path: 'mock_poster1.jpg',
    popularity: 0,
    origin_country: [],
    genre_ids: [],
    original_language: '',
    vote_count: 0,
    original_name: '' 
  },
  {
    id: 2,
    name: 'Mock Series 2',
    first_air_date: '2021-01-01',
    vote_average: 7.5,
    overview: 'This is a mock series overview.',
    backdrop_path: 'mock_backdrop.jpg',
    poster_path: 'mock_poster2.jpg',
    popularity: 0,
    origin_country: [],
    genre_ids: [],
    original_language: '',
    vote_count: 0,
    original_name: '' 
   },
];

describe('SeriesListComponent', () => {
  let component: SeriesListComponent;
  let fixture: ComponentFixture<SeriesListComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SeriesListComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSeries, value: mockSeries },
            { selector: selectError, value: '' },
          ],
        }),
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(SeriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load series on initialization', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(fromSeriesActions.loadSeries());
  });

  it('should display a list of series', () => {
    const seriesCards = fixture.debugElement.nativeElement.querySelectorAll('.series-card');
    expect(seriesCards.length).toBe(mockSeries.length);
  });

  it('should dispatch searchSeries action on search input', () => {
    const searchEvent = new Event('input');
    const inputField = fixture.debugElement.nativeElement.querySelector('.search-bar');
    inputField.value = 'test';
    inputField.dispatchEvent(searchEvent);

    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(fromSeriesActions.searchSeries({ searchTerm: 'test' }));
  });

  it('should dispatch loadSeries action on empty search input', () => {
    const searchEvent = new Event('input');
    const inputField = fixture.debugElement.nativeElement.querySelector('.search-bar');
    inputField.value = '';
    inputField.dispatchEvent(searchEvent);

    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(fromSeriesActions.loadSeries());
  });

  it('should navigate to the correct route when a series card is clicked', () => {
    component.redirect(1);
    expect(router.navigate).toHaveBeenCalledWith(['/series', 1]);
  });
});
