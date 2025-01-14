import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MoviesListComponent } from './movies-list.component';
import * as fromMovieActions from '../store/movie.actions';
import { selectMovies, selectError } from '../store/movie.selectors';
import { SharedModule } from '../../shared/shared.module';

const mockMovies = [
  { id: 1, title: 'Movie 1', poster_path: 'path1.jpg', vote_average: 8.0 },
  { id: 2, title: 'Movie 2', poster_path: 'path2.jpg', vote_average: 7.5 },
];

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectMovies, value: mockMovies },
            { selector: selectError, value: '' },
          ],
        }),
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on initialization', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(fromMovieActions.loadMovies());
  });

  it('should display a list of movies', () => {
    const movieCards = fixture.debugElement.nativeElement.querySelectorAll('.movie-card');
    expect(movieCards.length).toBe(mockMovies.length);
  });

  it('should dispatch searchMovies action on search input', () => {
    const searchEvent = new Event('input');
    const inputField = fixture.debugElement.nativeElement.querySelector('.search-bar');
    inputField.value = 'test';
    inputField.dispatchEvent(searchEvent);

    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(fromMovieActions.searchMovies({ searchTerm: 'test' }));
  });

  it('should dispatch loadMovies action on empty search input', () => {
    const searchEvent = new Event('input');
    const inputField = fixture.debugElement.nativeElement.querySelector('.search-bar');
    inputField.value = '';
    inputField.dispatchEvent(searchEvent);

    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(fromMovieActions.loadMovies());
  });

  it('should navigate to the correct route when a movie card is clicked', () => {
    component.redirect(1);
    expect(router.navigate).toHaveBeenCalledWith(['/movies', 1]);
  });
});
