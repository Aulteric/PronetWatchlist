import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { FavoritesListComponent } from './favorites-list.component';
import { selectFavorites } from '../store/favorites.selectors';
import { MemoizedSelector } from '@ngrx/store';
import { IMovie } from '../../shared/interfaces/IMovie';
import { ISeries } from '../../shared/interfaces/ISeries';
import { MediaCardComponent } from '../../shared/components/media-card/media-card.component';
import { of } from 'rxjs';

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;
  let store: MockStore;
  let mockSelectFavorites: MemoizedSelector<any, (IMovie | ISeries)[]>;

  const mockFavorites: (IMovie | ISeries)[] = [
    { 
      id: 1, 
      title: 'Mock Movie',
      poster_path: null,
      adult: false,
      overview: '',
      release_date: '',
      genres: [],
      original_title: '',
      backdrop_path: null,
      popularity: 0,
      vote_count: 0,
      video: false,
      vote_average: 0,
      runtime: 0
    },
    { 
      poster_path: null,
      overview: '',
      id: 2,
      original_name: '',
      name: 'Mock Series',
      backdrop_path: null,
      popularity: 0,
      vote_count: 0,
      original_language: '',
      vote_average: 0,
      first_air_date: '',
      origin_country: [],
      genre_ids: []
    }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesListComponent, MediaCardComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockSelectFavorites = store.overrideSelector(selectFavorites, mockFavorites);

    fixture = TestBed.createComponent(FavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a header with the text "Favorite Media"', () => {
    const header = fixture.debugElement.query(By.css('.header h2'));
    expect(header.nativeElement.textContent).toContain('Favorite Media');
  });

  it('should display the correct number of media cards', () => {
    const mediaCards = fixture.debugElement.queryAll(By.css('app-media-card'));
    expect(mediaCards.length).toBe(mockFavorites.length);
  });

  it('should pass the correct data to each media card', () => {
    const mediaCards = fixture.debugElement.queryAll(By.css('app-media-card'));

    mediaCards.forEach((card, index) => {
      expect(card.componentInstance.media).toEqual(mockFavorites[index]);
    });
  });

  it('should handle an empty favorites list gracefully', () => {
    mockSelectFavorites.setResult([]);
    store.refreshState();
    fixture.detectChanges();

    const mediaCards = fixture.debugElement.queryAll(By.css('app-media-card'));
    expect(mediaCards.length).toBe(0);
  });

  it('should handle an observable emitting new favorites', () => {
    const updatedFavorites: (IMovie | ISeries)[] = [
      { 
        id: 3, 
        title: 'Updated Mock Movie',
        poster_path: null,
        adult: false,
        overview: '',
        release_date: '',
        genres: [],
        original_title: '',
        backdrop_path: null,
        popularity: 0,
        vote_count: 0,
        video: false,
        vote_average: 0,
        runtime: 0
      }
    ];

    mockSelectFavorites.setResult(updatedFavorites);
    store.refreshState();
    fixture.detectChanges();

    const mediaCards = fixture.debugElement.queryAll(By.css('app-media-card'));
    expect(mediaCards.length).toBe(updatedFavorites.length);
    expect(mediaCards[0].componentInstance.media).toEqual(updatedFavorites[0]);
  });
});
