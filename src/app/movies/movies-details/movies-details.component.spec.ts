import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { MoviesDetailsComponent } from './movies-details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadMovieById, addMovieToFavorite, removeMovieFromFavorite } from '../store/movie.actions';
import { selectMovieFavorites, selectSelectedMovie } from '../store/movie.selectors';
import { SharedModule } from '../../shared/shared.module';

const mockMovie = {
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

describe('MoviesDetailsComponent', () => {
  let component: MoviesDetailsComponent;
  let fixture: ComponentFixture<MoviesDetailsComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesDetailsComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSelectedMovie, value: mockMovie },
            { selector: selectMovieFavorites, value: [mockMovie] },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(MoviesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie details correctly', () => {
    const titleElement = fixture.debugElement.nativeElement.querySelector('.movie-title');
    const genresElement = fixture.debugElement.nativeElement.querySelector('.genres');
    const ratingElement = fixture.debugElement.nativeElement.querySelector('.rating');
    const runtimeElement = fixture.debugElement.nativeElement.querySelector('.runtime');
    const overviewElement = fixture.debugElement.nativeElement.querySelector('.overview');

    expect(titleElement.textContent).toContain('Mock Movie (2022)');
    expect(genresElement.textContent).toContain('Action, Adventure');
    expect(ratingElement.textContent).toContain('8.5 / 10');
    expect(runtimeElement.textContent).toContain('120 mins');
    expect(overviewElement.textContent).toContain('This is a mock movie.');
  });

  it('should toggle favorite status when the button is clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Remove from Favorites');

    button.click();
    expect(dispatchSpy).toHaveBeenCalledWith(removeMovieFromFavorite({ movieId: mockMovie.id }));

    component.isFavorite = false;
    fixture.detectChanges();

    expect(button.textContent).toContain('Add to Favorites');

    button.click();
    expect(dispatchSpy).toHaveBeenCalledWith(addMovieToFavorite({ movie: mockMovie }));
  });

  it('should clean up subscriptions on destroy', () => {
    spyOn(component['subs'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subs'].unsubscribe).toHaveBeenCalled();
  });
});
