import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { TmdbService } from '../shared/services/tmdb/tmdb.service';
import { By } from '@angular/platform-browser';

const mockTrendingMedia = [
  { 
    id: 1, 
    media_type: 'movie', 
    poster_path: 'path1.jpg', 
    vote_average: 8.5,
    backdrop_path: "",
    title: "",
    original_title: "",
    overview: "",
    adult: false,
    original_language: "",
    popularity: 0,
    release_date: "",
    video: false,
    vote_count: 0
  },
  { 
    id: 2, 
    media_type: 'series', 
    poster_path: 'path2.jpg', 
    vote_average: 7.3,
    backdrop_path: "",
    title: "",
    original_title: "",
    overview: "",
    adult: false,
    original_language: "",
    popularity: 0,
    release_date: "",
    video: false,
    vote_count: 0
  },
];

class MockTmdbService {
  getTrendingMedia() {
    return of({ results: mockTrendingMedia });
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: TmdbService, useClass: MockTmdbService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load trending media on initialization', () => {
    expect(component.trendingMedia).toEqual(mockTrendingMedia);
  });

  it('should render trending media items', () => {
    const trendingItems = fixture.debugElement.queryAll(By.css('.trending-item'));
    expect(trendingItems.length).toBe(mockTrendingMedia.length);
  });

  it('should display the correct image and rating for each media item', () => {
    const trendingItems = fixture.debugElement.queryAll(By.css('.trending-item'));

    trendingItems.forEach((item, index) => {
      const img = item.query(By.css('img'));
      const rating = item.query(By.css('.rating'));

      expect(img.nativeElement.src).toContain(mockTrendingMedia[index].poster_path);
      expect(rating.nativeElement.textContent).toContain(mockTrendingMedia[index].vote_average.toFixed(1));
    });
  });

  it('should navigate to the correct route when a trending item is clicked', () => {
    const trendingItems = fixture.debugElement.queryAll(By.css('.trending-item'));

    trendingItems[0].triggerEventHandler('click', null);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movies', mockTrendingMedia[0].id]);

    trendingItems[1].triggerEventHandler('click', null);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/series', mockTrendingMedia[1].id]);
  });

  it('should clean up subscriptions on destroy', () => {
    spyOn(component['subs'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subs'].unsubscribe).toHaveBeenCalled();
  });
});
