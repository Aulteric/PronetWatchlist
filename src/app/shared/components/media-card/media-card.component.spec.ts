import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaCardComponent } from './media-card.component';
import { By } from '@angular/platform-browser';
import { IMovie } from '../../interfaces/IMovie';
import { ISeries } from '../../interfaces/ISeries';

const mockMovie: IMovie = {
  id: 1, 
  title: 'Mock Movie',
  adult: false,
  overview: '',
  genres: [],
  original_title: '',
  backdrop_path: null,
  popularity: 0,
  vote_count: 0,
  video: false,
  vote_average: 0,
  runtime: 0,
  release_date: '2023-01-01',
  poster_path: 'test_movie.jpg',
};

const mockSeries: ISeries = {
  overview: '',
  id: 2,
  original_name: '',
  name: 'Mock Series',
  backdrop_path: null,
  popularity: 0,
  vote_count: 0,
  original_language: '',
  vote_average: 0,
  origin_country: [],
  genre_ids: [],
  first_air_date: '2022-01-01',
  poster_path: 'test_series.jpg',
};

describe('MediaCardComponent', () => {
  let component: MediaCardComponent;
  let fixture: ComponentFixture<MediaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie title and release date when media is a movie', () => {
    component.media = mockMovie;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    const dateElement = fixture.debugElement.query(By.css('.card-text')).nativeElement;

    expect(titleElement.textContent).toContain('Mock Movie');
    expect(dateElement.textContent).toContain('2023-01-01');
  });

  it('should display series name and first air date when media is a series', () => {
    component.media = mockSeries;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    const dateElement = fixture.debugElement.query(By.css('.card-text')).nativeElement;

    expect(titleElement.textContent).toContain('Mock Series');
    expect(dateElement.textContent).toContain('2022-01-01');
  });

  it('should emit onItemClick event with media id when card is clicked', () => {
    spyOn(component.onItemClick, 'emit');
    component.media = mockMovie;
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(By.css('.card'));
    cardElement.triggerEventHandler('click', null);

    expect(component.onItemClick.emit).toHaveBeenCalledWith(mockMovie.id);
  });

  it('should not emit onItemClick event if media is undefined', () => {
    spyOn(component.onItemClick, 'emit');
    component.media = undefined;
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(By.css('.card'));
    if (cardElement) {
      cardElement.triggerEventHandler('click', null);
    }

    expect(component.onItemClick.emit).not.toHaveBeenCalled();
  });

  it('should render the fallback image directive for broken images', () => {
    component.media = mockMovie;
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.getAttribute('appImageFallback')).not.toBeNull();
  });
});
